import { PropertyAmenity, PropertyRule, PropertyType } from "./enums";

export interface PropertyFiltersCriteria {
    countryId: number,
    cityId: number,

    // date.toJSON().slice(0, 10)
    dateFrom: string,
    dateTo: string,
    
    numPersons: number,

    maxCost: number,

    type: PropertyType,

    amenityFilters: PropertyAmenity[],
    ruleFilters: PropertyRule[],
}

export interface PaginationRequest {
    pageNum: number,
    pageSize: number,
}

export interface PropertySearchRequest {
    paginationInfo: PaginationRequest,
    filtersInfo: PropertyFiltersCriteria,
};
