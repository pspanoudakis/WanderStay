import { ImageEntity } from "./ImageEntity"
import { Message } from "./Message"

export type Conversation = {
    id: number,
    hostUsername: string,
    hostImg: ImageEntity | null,
    guestUsername: string,
    guestImg: ImageEntity | null,
    propertyName: string,
    propertyId: number,
    messages: Message[]
}
