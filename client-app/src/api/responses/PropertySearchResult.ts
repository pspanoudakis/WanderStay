import { PropertyReviewsSummary } from "../entities/PropertyReviewsSummary";
import { PropertyType } from "../entities/propertyEnums";

export type PropertySearchResult = {
    propertyId: number,
    propertyType: PropertyType,
    title: string,
    description: string,
    imgId: number | null,
    numBeds: number,
    reviewsSummary: PropertyReviewsSummary,
    pricePerNight: number,
    totalPrice: number
};
