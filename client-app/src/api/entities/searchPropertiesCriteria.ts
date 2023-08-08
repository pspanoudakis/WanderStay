import { PropertyAmenity, PropertyRule, PropertyType } from "./propertyEnums";

export interface PropertySearchFilters {
    maxCost: number,

    type?: PropertyType,

    amenityFilters: {
        [amenity in PropertyAmenity]: boolean
    },
    ruleFilters: {
        [rule in PropertyRule]: boolean
    },
}

export type PropertySearchCriteria = {
    countryId: number,
    cityId: number,

    // date.toJSON().slice(0, 10)
    dateFrom: string,
    dateTo: string,
    
    numPersons: number,
} & PropertySearchFilters
