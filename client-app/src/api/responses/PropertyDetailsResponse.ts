import { AvailableTimeSlot } from "../entities/AvailableTimeSlot"
import { ImageEntity } from "../entities/ImageEntity"
import { LocationEntity } from "../entities/LocationEntity"
import { PropertyReviewsSummary } from "../entities/PropertyReviewsSummary";
import { PropertyDetailedAmenities, PropertyDetailedRules, PropertyType, PublicTransportAccess, PublicTransportAccessFlags } from "../entities/propertyEnums"

export type PropertyDetailsResponse = {
    propertyDetails: {
        propertyId: number,
        propertyType: PropertyType,
        title: string,
        description: string,
        images: ImageEntity[],
        reviewsSummary: PropertyReviewsSummary,
        hostName: string,
        hostImg: ImageEntity | null,
        availableSlots: AvailableTimeSlot[],
        amenities: PropertyDetailedAmenities,
        rules: PropertyDetailedRules,
        transport: PublicTransportAccessFlags,
        spaceArea: number,
        address: string,
        city: LocationEntity | null,
        country: LocationEntity | null,
        latitude: number,
        longitude: number,
    }
};

export type PropertyDetails = PropertyDetailsResponse["propertyDetails"];
