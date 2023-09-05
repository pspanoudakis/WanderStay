import { Link, useParams } from "react-router-dom";
import { ChatContainer } from "../components/ChatContainer";
import { MouseEvent, useCallback, useContext, useRef, useState } from "react";
import { getHostSideConversation, markConversationAsDeleted } from "../api/fetchRoutines/conversationAPI";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { ORDERED_BASE_ROLE_PATHS } from "./pathConstants";
import { AppContext, openModal } from "../AppContext";
import { ModalActionResultTemplate } from "../components/ModalActionResultTemplate";
import { LoadingSpinner } from "../components/LoadingSpinner";

export function PropertyHostSideChatPage() {
    const ctx = useContext(AppContext);
    const {propertyId, conversationId} = useParams();

    const [loading, setLoading] = useState(false);
    const [redirectAfterDelete, setRedirectAfterDelete] = useState(false);
    const deleteButtonRef = useRef<HTMLAnchorElement>(null);

    const deleteConversationAndRedirect = async (e: MouseEvent<HTMLAnchorElement>) => {
        if (!redirectAfterDelete) {
            e.preventDefault();
            setLoading(true);            
            const response = await markConversationAsDeleted(Number(conversationId));
            openModal(ctx, {
                content: () => (
                    <ModalActionResultTemplate
                        success={response.ok}
                        successText="Η Συνομιλία διεγράφη επιτυχώς"
                        errorText="Σφάλμα διαγραφής συνομιλίας"
                    />
                )
            })
            if (response.ok) {
                setRedirectAfterDelete(true);
                setTimeout(() => deleteButtonRef.current?.click());
            } else {
                setLoading(false);
            }
        }
    }

    const fetchConversation = useCallback(() => {
        return getHostSideConversation(Number(conversationId));
    }, [conversationId]);

    return (
        <div className="flex flex-col gap-3 w-2/3 h-max relative">
            <LoadingSpinner
                text="Διαγραφή Συνομιλίας"
                coverParent={true}
                visible={loading}
            />
            <div className="flex justify-center w-full">
                <Link 
                    ref={deleteButtonRef}
                    to={`${ORDERED_BASE_ROLE_PATHS.HOST}/property/${propertyId}/allChat`} 
                    onClick={e => deleteConversationAndRedirect(e)}>
                    <button 
                        className="
                            flex gap-2 justify-center items-center
                            rounded-lg py-1 px-3
                            duration-200 bg-red-600 text-white hover:bg-red-700
                        "
                    >
                        <FontAwesomeIcon icon={faTrashAlt}/>
                        Διαγραφή Συνομιλίας
                    </button>                
                </Link>
            </div>
            <ChatContainer
                conversationFetcher={fetchConversation}
            />
        </div>
    );
}
