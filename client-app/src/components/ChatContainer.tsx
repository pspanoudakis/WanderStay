import { MessagesContainer } from "./MessagesContainer";
import { SendMessageForm } from "./SendMessageForm";
import { Conversation } from "../api/entities/Conversation";
import { sendMessageToConversation } from "../api/fetchRoutines/conversationAPI";
import { useEffect, useState } from "react";
import { LoadingSpinner } from "./LoadingSpinner";
import { FetchDataResponse } from "../api/fetchRoutines/fetchAPI";

interface ChatContainerProps {
    conversationFetcher: () => 
        Promise<FetchDataResponse<{
            conversation: Conversation}
        >>
}

export function ChatContainer(props: ChatContainerProps){

    const [loading, setLoading] = useState(true);
    const [conversation, setConversation] = useState<Conversation>();

    useEffect(() => {
        setLoading(true);
        props.conversationFetcher()
        .then(response => {
            if (response.ok) {
                setConversation(response.content.conversation);
            }
            setLoading(false);
        });
    }, [props.conversationFetcher]);

    function sendMessage(text: string){
        if (conversation) {
            setLoading(true);

            sendMessageToConversation(conversation.id, text)
            .then(response => {
                if (response.ok) {
                    setConversation({
                        ...conversation,
                        messages: [
                            ...conversation.messages,
                            response.content.message
                        ]
                    })
                }
                setLoading(false);
            });
        }
    };

    return(
        <div className="flex flex-col gap-2 w-full relative">
            <LoadingSpinner
                customTwBgColor="bg-white/60"
                visible={loading}
                coverParent={true}
                text=""
            />
            <MessagesContainer messages={conversation?.messages ?? []}/>
            <SendMessageForm
                onSend={text => sendMessage(text)}
            />
        </div>
    );
}
