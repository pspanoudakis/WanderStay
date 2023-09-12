import { PropertyType } from "../entities/propertyEnums";

export type PropertyReservationResult = {
    propertyId: number,
    propertyType: PropertyType,
    title: string,
    imgId: number | null,

    guestUsername: string,
    dateFrom: string,
    dateTo: string,
    numPersons: number,
    totalPrice: number
};
