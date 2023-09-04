import { Message } from "../entities/Message"

export type PropertyConversationResult = {
    id: number,
    guestUsername: string,
    lastMessage: Message
};
