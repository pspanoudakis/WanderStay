import { useParams } from "react-router-dom";
import { ChatContainer } from "../components/ChatContainer";
import { useCallback } from "react";
import { getHostSideConversation } from "../api/fetchRoutines/conversationAPI";

export function PropertyHostSideChatPage() {
    const {conversationId} = useParams();

    const fetchConversation = useCallback(() => {
        return getHostSideConversation(Number(conversationId));
    }, [conversationId]);

    return (
        <div className="w-2/3 h-max relative">
            <ChatContainer
                conversationFetcher={fetchConversation}
            />
        </div>
    );
}
