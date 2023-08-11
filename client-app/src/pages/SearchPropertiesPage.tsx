import { useCallback, useContext, useState } from "react";
import { AppContext } from "../AppContext";
import { SearchFilters } from "../components/SearchFilters";
import { PropertyAmenityFilters, PropertyRuleFilters, PropertySearchFilters } from "../api/entities/searchPropertiesCriteria";
import { PropertyAmenity, PropertyRule } from "../api/entities/propertyEnums";
import { PaginatedResultsWrapper } from "../components/PaginatedResultsWrapper";
import { useSearchParams } from "react-router-dom";
import { fetchPropertyResults } from "../api/fetchRoutines/searchAPI";
import { PropertyResultTile } from "../components/PropertyResultTile";

const MAX_SLIDER_COST = 1000
const SLIDER_MARKS = [0, 100, 250, 500, MAX_SLIDER_COST];
export function SearchPropertiesPage() {

    const {
        state: { businessContext }
    } = useContext(AppContext);

    const [params, ] = useSearchParams();

    const [filters, setFilters] = useState<PropertySearchFilters>({
        maxCostPerDay: 100,
        type: undefined,
        amenityFilters: Object.values(PropertyAmenity).reduce(
            (filters, amenity) => {
                filters[amenity] = false;
                return filters;
            },
            {} as PropertyAmenityFilters
        ),
        ruleFilters: Object.values(PropertyRule).reduce(
            (filters, rule) => {
                filters[rule] = false;
                return filters;
            },
            {} as PropertyRuleFilters
        ),
    });

    const fetchProperties = useCallback(
        async (pageNum: number, pageSize: number) => {
            return fetchPropertyResults({
                filtersInfo: {
                    ...filters,                    
                    dateFrom: businessContext.searchContext.dateFrom,
                    dateTo: businessContext.searchContext.dateTo,
                    countryId: businessContext.searchContext.country?.id,
                    cityId: businessContext.searchContext.city?.id,
                    numPersons: businessContext.searchContext.numPersons,
                    maxCostPerDay: (
                        filters.maxCostPerDay === MAX_SLIDER_COST ?
                            undefined
                            :
                            filters.maxCostPerDay
                    )
                },
                paginationInfo: {
                    pageNum,
                    pageSize
                }
            }).then(res => {
                return res.content;
            });

        },[params, filters]
    );

    return (
        <div className="flex w-full justify-start gap-10 mt-10 h-full">
            <SearchFilters
                filters={filters}
                setFilters={setFilters}
                sliderMarks={SLIDER_MARKS}
            />
            <PaginatedResultsWrapper
                pageSize={3}
                resultFetcher={fetchProperties}
                resultRenderer={(id, idx) => {
                    return (
                        <PropertyResultTile
                            key={idx}
                            propertyPreview={{
                                propertyId: id,
                                description: `Description ${id}`,
                                imgSrc: 'https://media.cntraveler.com/photos/5d112d50c4d7bd806dbc00a4/16:9/w_1280,c_limit/airbnb%20luxe.jpg',
                                nofBeds: id,
                                nofReviews: id,
                                pricePerNight: id,
                                reviewRate: id,
                                title: `Property ${id}`,
                                totalPrice: id
                            }}
                        />
                    )
                }}
            />
        </div>
    );
}
