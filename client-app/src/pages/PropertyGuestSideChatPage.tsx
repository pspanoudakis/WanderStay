import { useParams } from "react-router-dom";
import { ChatContainer } from "../components/ChatContainer";
import { Conversation } from "../api/entities/Conversation";
import { useEffect, useState } from "react";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { getGuestSideConversation, sendMessageToConversation } from "../api/fetchRoutines/conversationAPI";

export function PropertyGuestSideChatPage() {
    const {propertyId} = useParams();

    const [loading, setLoading] = useState(true);
    const [conversation, setConversation] = useState<Conversation>();

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

    useEffect(() => {
        setLoading(true);
        getGuestSideConversation(Number(propertyId))
        .then(response => {
            if (response.ok) {
                setConversation(response.content.conversation)
            }
            setLoading(false);
        });
    }, [propertyId]);

    return (
        <div className="w-2/3 h-max relative">
            <LoadingSpinner
                customTwBgColor="bg-white/60"
                visible={loading}
                coverParent={true}
                text=""
            />
            <ChatContainer
                conversation={conversation}
                sendMessage={sendMessage}
            />
        </div>
    )
}
