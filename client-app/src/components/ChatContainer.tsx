import { MessagesContainer } from "./MessagesContainer";
import { SendMessageForm } from "./SendMessageForm";
import { Conversation } from "../api/entities/Conversation";

interface ChatContainerProps {
    conversation?: Conversation,
    sendMessage: (text: string) => void
}

export function ChatContainer(props: ChatContainerProps){
    return(
        <div className="flex flex-col gap-2 w-full relative">
            <MessagesContainer messages={props.conversation?.messages ?? []}/>
            <SendMessageForm
                onSend={text => props.sendMessage(text)}
            />
        </div>
    )
}
