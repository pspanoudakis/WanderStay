import { PropertyAmenityFlags, PropertyRuleFlags, PropertyType } from "./propertyEnums";

export type PropertySearchFilters = {
    maxCostPerDay?: number,

    type?: PropertyType,

    amenityFilters: PropertyAmenityFlags,
    ruleFilters: PropertyRuleFlags,
}

export type PropertySearchCriteria = {
    countryId: number | null,
    cityId: number | null,

    // date.toJSON().slice(0, 10)
    dateFrom: string | null,
    dateTo: string | null,
    
    numPersons: number,
} & PropertySearchFilters
