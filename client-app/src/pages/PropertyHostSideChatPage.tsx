import { useNavigate, useParams } from "react-router-dom";
import { ChatContainer } from "../components/ChatContainer";
import { useCallback, useContext, useState } from "react";
import { getHostSideConversation, markConversationAsDeleted } from "../api/fetchRoutines/conversationAPI";
import { ORDERED_BASE_ROLE_PATHS } from "./pathConstants";
import { AppContext, openModal } from "../AppContext";
import { ModalActionResultTemplate } from "../components/ModalActionResultTemplate";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { useNavigateIfAuthenticationFailed } from "../hooks/useNavigateIfAuthenticationFailed";

export function PropertyHostSideChatPage() {
    const ctx = useContext(AppContext);
    const {propertyId, conversationId} = useParams();
    const navigate = useNavigate();
    const navigateIfAuthFailed = useNavigateIfAuthenticationFailed();

    const [loading, setLoading] = useState(false);

    const deleteConversationAndRedirect = () => {
        setLoading(true);            
        markConversationAsDeleted(Number(conversationId))
        .then(response => {
            if (navigateIfAuthFailed(response)) return;
            openModal(ctx, {
                content: () => (
                    <ModalActionResultTemplate
                        success={response.ok}
                        successText="Η Συνομιλία διεγράφη επιτυχώς."
                        defaultErrorText="Σφάλμα διαγραφής Συνομιλίας."
                    />
                )
            })
            if (response.ok) {
                navigate(
                    `${ORDERED_BASE_ROLE_PATHS.HOST}/property/${propertyId}`,
                    { replace: false }
                )
            } else {
                setLoading(false);
            }
        })
    }

    const fetchConversation = useCallback(() => {
        return getHostSideConversation(Number(conversationId));
    }, [conversationId]);

    return (
        <div className="flex flex-col gap-8 w-2/3 h-max relative">
            <LoadingSpinner
                text="Διαγραφή Συνομιλίας"
                coverParent={true}
                visible={loading}
            />
            <ChatContainer 
                conversationFetcher={fetchConversation}
                isGuestSide={false}
                onDelete={deleteConversationAndRedirect}
            />
        </div>
    );
}
