import { PropertyType } from "../entities/propertyEnums";

export type PropertyReservationResult = {
    propertyId: number,
    propertyType: PropertyType,
    title: string,
    imgId: number | null,
    dateFrom: string,
    dateTo: string,
    nofPeople: number,
    location: string
};
