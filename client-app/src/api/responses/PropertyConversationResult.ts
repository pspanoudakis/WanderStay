import { ImageEntity } from "../entities/ImageEntity";
import { Message } from "../entities/Message"

export type PropertyConversationResult = {
    id: number,
    guestUsername: string,
    guestImg: ImageEntity | null,
    lastMessage: Message
};
