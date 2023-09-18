import { Link } from "react-router-dom";
import { PropertyConversationResult } from "../api/responses/PropertyConversationResult";
import { ORDERED_BASE_ROLE_PATHS } from "../pages/pathConstants";
import { useContext } from "react";
import { AppContext } from "../AppContext";
import { UserAvatar } from "./UserAvatar";

const MAX_MSG_TEXT_PREVIEW_LENGTH = 80;

export function ConversationResultTile(props: {
    conversationPreview: PropertyConversationResult,
    propertyId: Number
}) {
    const {userContext} = useContext(AppContext).state.businessContext;
    const conversation = props.conversationPreview;
    return (
        <Link 
            to={`${ORDERED_BASE_ROLE_PATHS.HOST}/property/${props.propertyId}/chat/${conversation.id}`} 
            className="
                flex justify-center items-center gap-3 
                border-2 border-main-petrol rounded-xl px-3 py-2
                duration-200 hover:bg-xlight-petrol
            "
        >
            <div>
            <UserAvatar
                imgId={conversation.guestImg?.imgId}
                username={conversation.guestUsername}
            />
            </div>
            <div className="flex flex-col w-full items-start">
                <div className="flex w-full items-center justify-between">
                    <span className="text-lg font-bold">{conversation.guestUsername}</span>
                    <span className="text-sm">{conversation.lastMessage.sentOn}</span>
                </div>
                <span>
                    {conversation.lastMessage.sentBy === userContext?.username ? 'Εσείς: ' : ''}
                    <span className="italic">
                        {
                            conversation.lastMessage.text.length > MAX_MSG_TEXT_PREVIEW_LENGTH ?
                            `${conversation.lastMessage.text.slice(0, MAX_MSG_TEXT_PREVIEW_LENGTH - 1)}...`
                            :
                            conversation.lastMessage.text
                        }
                    </span>
                </span>
            </div>
            
        </Link>
    );
}
