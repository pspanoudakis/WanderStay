import { PropertyReviewsSummary } from "../entities/PropertyReviewsSummary"
import { PropertyType } from "../entities/propertyEnums"

export type PropertyBasicPreviewInfo = {
    propertyId: number,
    propertyType: PropertyType,
    title: string,
    imgId: number | null,
    reviewsSummary: PropertyReviewsSummary
}
