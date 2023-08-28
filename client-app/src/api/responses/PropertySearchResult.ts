import { PropertyReviewsSummary } from "../entities/PropertyReviewsSummary";

export type PropertySearchResult = {
    propertyId: number,
    title: string,
    description: string,
    imgId: number | null,
    numBeds: number,
    reviewsSummary: PropertyReviewsSummary,
    pricePerNight: number,
    totalPrice: number
};
