import { useParams } from "react-router-dom";
import { ChatContainer } from "../components/ChatContainer";
import { useCallback } from "react";
import { getGuestSideConversation } from "../api/fetchRoutines/conversationAPI";

export function PropertyGuestSideChatPage() {
    const {propertyId} = useParams();

    const fetchConversation = useCallback(() => {
        return getGuestSideConversation(Number(propertyId));
    }, [propertyId]);

    return (
        <div className="w-2/3 h-max relative">
            <ChatContainer
                conversationFetcher={fetchConversation}
                isGuestSide={true}
            />
        </div>
    );
}
