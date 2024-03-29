import { PropertySearchResult } from "../responses/PropertySearchResult";
import { PropertyAmenity, PropertyRule } from "../entities/propertyEnums";
import { PropertySearchRequest } from "../requests/PropertySearchRequest";
import { convertToPaginatedResponse } from "../responses/PaginatedResponse";
import { createEndPointUrl, fetchData } from "./fetchAPI";

function createSearchRequestBody(searchOptions: PropertySearchRequest) {
    const filtersInfo = searchOptions.filtersInfo;
    return {
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
            numPersons: filtersInfo.numPersons,
            dateFrom: filtersInfo.dateFrom,
            dateTo: filtersInfo.dateTo
        },
        paginationInfo: {
            ...searchOptions.paginationInfo
        }
    };
}

export async function fetchPropertyResults(searchOptions: PropertySearchRequest) {
    const response = await fetchData({
        endpoint: createEndPointUrl("/property/search"),
        method: "POST",
        body: createSearchRequestBody(searchOptions)
    });
    return convertToPaginatedResponse<PropertySearchResult>(response);
}
