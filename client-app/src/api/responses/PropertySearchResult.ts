import { PropertyBasicPreviewInfo } from "./PropertyBasicPreviewInfo";

export type PropertySearchResult = {
    numBeds: number,
    pricePerNight: number,
    totalPrice: number
} & PropertyBasicPreviewInfo;
