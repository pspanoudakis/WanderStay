import { useCallback, useContext, useEffect, useState } from "react";
import { AppContext, setSearchContext } from "../AppContext";
import { SearchFilters } from "../components/SearchFilters";
import { PropertySearchFilters } from "../api/entities/searchPropertiesCriteria";
import { PropertyAmenity, PropertyAmenityFlags, PropertyRule, PropertyRuleFlags } from "../api/entities/propertyEnums";
import { PaginatedResultsWrapper } from "../components/PaginatedResultsWrapper";
import { useSearchParams } from "react-router-dom";
import { fetchPropertyResults } from "../api/fetchRoutines/searchAPI";
import { PropertyResultTile } from "../components/PropertyResultTile";

const MAX_SLIDER_COST = 1000
const SLIDER_MARKS = [0, 100, 250, 500, MAX_SLIDER_COST];
export function SearchPropertiesPage() {

    const appCtx = useContext(AppContext);

    const [params, ] = useSearchParams();

    const [triggerSearchHelper, setTriggerSearchHelper] = useState(false)

    const [filters, setFilters] = useState<PropertySearchFilters>({
        maxCostPerDay: 100,
        type: undefined,
        amenityFilters: Object.values(PropertyAmenity).reduce(
            (filters, amenity) => {
                filters[amenity] = false;
                return filters;
            },
            {} as PropertyAmenityFlags
        ),
        ruleFilters: Object.values(PropertyRule).reduce(
            (filters, rule) => {
                filters[rule] = false;
                return filters;
            },
            {} as PropertyRuleFlags
        ),
    });

    const extractUrlParams = () => {
        return {
            dateFrom: params.get('dateFrom'),
            dateTo: params.get('dateTo'),
            countryId: (
                params.get('countryId') ?
                    Number(params.get('countryId'))
                    :
                    null
            ),
            cityId: (
                params.get('cityId') ?
                    Number(params.get('cityId'))
                    :
                    null
            ),
            numPersons: (
                params.get('numPersons') ?
                    Number(params.get('numPersons'))
                    :
                    1
            )
        }
    }

    useEffect(() => {
        setSearchContext(appCtx, extractUrlParams())
    }, [params])

    const fetchProperties = useCallback(
        async (pageNum: number, pageSize: number) => {
            return fetchPropertyResults({
                filtersInfo: {
                    ...filters,
                    maxCostPerDay: (
                        filters.maxCostPerDay === MAX_SLIDER_COST ?
                            undefined
                            :
                            filters.maxCostPerDay
                    ),                   
                    ...extractUrlParams()               
                },
                paginationInfo: {
                    pageNum,
                    pageSize
                }
            }).then(res => {
                return res.content;
            });

        },
        [params, triggerSearchHelper]
    );

    return (
        <div className="flex w-full justify-start gap-10 h-full">
            <SearchFilters
                filters={filters}
                setFilters={setFilters}
                sliderMarks={SLIDER_MARKS}
                onSearch={() => setTriggerSearchHelper(triggerSearchHelper !== true)}
            />
            <PaginatedResultsWrapper
                pageSize={4}
                idleTitleBuilder={(n) => `Βρέθηκαν ${n} αποτελέσματα`}
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
