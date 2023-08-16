import { PropertyAmenity, PropertyRule, PropertyType } from "./propertyEnums";

export type PropertyAmenityFilters = {
    [amenity in PropertyAmenity]: boolean
}

export type PropertyRuleFilters = {
    [rule in PropertyRule]: boolean
}

export type PropertySearchFilters = {
    maxCostPerDay?: number,

    type?: PropertyType,

    amenityFilters: PropertyAmenityFilters,
    ruleFilters: PropertyRuleFilters,
}

export type PropertySearchCriteria = {
    countryId: number | null,
    cityId: number | null,

    // date.toJSON().slice(0, 10)
    dateFrom: string | null,
    dateTo: string | null,
    
    numPersons: number,
} & PropertySearchFilters
