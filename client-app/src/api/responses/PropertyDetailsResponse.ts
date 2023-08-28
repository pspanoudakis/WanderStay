import { AvailableTimeSlot } from "../entities/AvailableTimeSlot"
import { ImageEntity } from "../entities/ImageEntity"
import { LocationEntity } from "../entities/LocationEntity"
import { PropertyReviewsSummary } from "../entities/PropertyReviewsSummary";
import { PropertyDetailedAmenities, PropertyDetailedRules, PropertyType } from "../entities/propertyEnums"

export type PropertyDetailsResponse = {
    propertyId: number,
    propertyType: PropertyType,
    title: string,
    description: string,
    images: ImageEntity[],
    reviewsSummary: PropertyReviewsSummary,
    hostName: string,
    availableSlots: AvailableTimeSlot[],
    amenities: PropertyDetailedAmenities,
    rules: PropertyDetailedRules,
    spaceArea: number,
    address: string,
    city: LocationEntity,
    country: LocationEntity,
    latitude: number,
    longitude: number,
};
