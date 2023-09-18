import { ImageEntity } from "../entities/ImageEntity"

export type PropertyReviewResult = {
    guestUsername: string,
    guestImg: ImageEntity | null,
    createdOn: string,
    stars: number,
    text: string
}
