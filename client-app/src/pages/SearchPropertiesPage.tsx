import { useCallback, useContext, useState } from "react";
import { AppContext } from "../AppContext";
import { SearchFilters } from "../components/SearchFilters";
import { PropertyAmenityFilters, PropertyRuleFilters, PropertySearchFilters } from "../api/entities/searchPropertiesCriteria";
import { PropertyAmenity, PropertyRule } from "../api/entities/propertyEnums";
import { PaginatedResultsWrapper } from "../components/PaginatedResultsWrapper";
import { useSearchParams } from "react-router-dom";
import { fetchPropertyResults } from "../api/fetchRoutines/searchAPI";

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
                    numPersons: businessContext.searchContext.numPersons
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
            />
            <PaginatedResultsWrapper
                pageSize={5}
                resultFetcher={fetchProperties}
                resultRenderer={(r) => <span>{String(r)}</span>}
            />
        </div>
    );
}
