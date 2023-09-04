import { Message } from "./Message"

export type Conversation = {
    id: number,
    hostUsername: string,
    guestUsername: string,
    propertyName: string,
    messages: Message[]
}
