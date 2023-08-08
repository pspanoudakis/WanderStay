import { dateToStr } from "../entities/dates";
import { PropertyAmenity, PropertyRule } from "../entities/propertyEnums";
import { PropertySearchRequest } from "../requests/PropertySearchRequest";
import { PaginatedResponse } from "../responses/PaginatedResponse";
import { FetchDataResponse, fetchData } from "./fetchAPI";

export async function fetchPropertyResults(searchOptions: PropertySearchRequest) {
    const filtersInfo = searchOptions.filtersInfo;
    return await fetchData({
        endpoint: "https://localhost:8080/property/search",
        method: "POST",
        body: {
            filtersInfo: {
                ...filtersInfo,
                type: filtersInfo.type,
                amenityFilters: (
                    Object.values(PropertyAmenity).reduce(
                        (acc, key) => {
                            if (filtersInfo.amenityFilters[key]) {
                                acc.push(key)
                            }
                            return acc;
                        },
                        [] as PropertyAmenity[]
                    )
                ),
                ruleFilters: (
                    Object.values(PropertyRule).reduce(
                        (acc, key) => {
                            if (filtersInfo.ruleFilters[key]) {
                                acc.push(key)
                            }
                            return acc;
                        },
                        [] as PropertyRule[]
                    )
                ),
                numPersons: searchOptions.filtersInfo.numPersons,
                dateFrom: dateToStr(filtersInfo.dateFrom),
                dateTo: dateToStr(filtersInfo.dateTo)
            },
            paginationInfo: {
                ...searchOptions.paginationInfo
            }
        }
    }) as FetchDataResponse<
        PaginatedResponse<number>
    >;
}
