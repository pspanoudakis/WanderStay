import { Link } from "react-router-dom";
import { PropertyConversationResult } from "../api/responses/PropertyConversationResult";
import { ORDERED_BASE_ROLE_PATHS } from "../pages/pathConstants";

export function ConversationResultTile(props: {
    conversationPreview: PropertyConversationResult,
    propertyId: Number
}) {
    const conversation = props.conversationPreview;
    return (
        <Link 
            to={`${ORDERED_BASE_ROLE_PATHS.HOST}/property/${props.propertyId}/chat/${conversation.id}`} 
            className="flex flex-col gap-3"
        >
            Conversation {conversation.id}
        </Link>
    );
}
