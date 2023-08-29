import { AvailableTimeSlot } from "../entities/AvailableTimeSlot";
import { ImageEntity } from "../entities/ImageEntity";
import { PropertyDetailedAmenities, PropertyDetailedRules, PropertyType } from "../entities/propertyEnums"

export type PropertyUpdateRequest = {
    propertyId: number | null,
    propertyType: PropertyType,
    title: string,
    description: string,
    imageSelections: ImageEntity[],
    availableSlots: AvailableTimeSlot[],
    amenities: PropertyDetailedAmenities,
    rules: PropertyDetailedRules,
    spaceArea: number,
    address: string,
    cityId: number,
    latitude: number,
    longitude: number,
};
