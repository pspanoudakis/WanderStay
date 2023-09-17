import { PropertyBasicPreviewInfo } from "./PropertyBasicPreviewInfo";

export type PropertyReservationResult = {
    guestUsername: string,
    hostUsername: string,
    dateFrom: string,
    dateTo: string,
    numPersons: number,
    totalPrice: number
} & PropertyBasicPreviewInfo;
