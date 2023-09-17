import { MessagesContainer } from "./MessagesContainer";
import { SendMessageForm } from "./SendMessageForm";
import { Conversation } from "../api/entities/Conversation";
import { sendMessageToConversation } from "../api/fetchRoutines/conversationAPI";
import { useCallback, useContext, useEffect, useState } from "react";
import { LoadingSpinner } from "./LoadingSpinner";
import { FetchDataResponse } from "../api/fetchRoutines/fetchAPI";
import { AppContext, openModal } from "../AppContext";
import { ModalActionResultTemplate } from "./ModalActionResultTemplate";
import { PrimaryButton } from "./PrimaryButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRefresh, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { ORDERED_BASE_ROLE_PATHS } from "../pages/pathConstants";
import { useNavigateIfAuthenticationFailed } from "../hooks/useNavigateIfAuthenticationFailed";

interface ChatContainerProps {
    conversationFetcher: () => 
        Promise<FetchDataResponse<{
            conversation: Conversation
        }>>,
    isGuestSide: boolean,
    onDelete?: () => void
}

export function ChatContainer(props: ChatContainerProps){

    const ctx = useContext(AppContext);

    const [loading, setLoading] = useState(true);
    const [conversation, setConversation] = useState<Conversation>();
    const navigateIfAuthFailed = useNavigateIfAuthenticationFailed();

    const fetchConversation = useCallback(() => {
        setLoading(true);
        props.conversationFetcher()
        .then(response => {
            if (navigateIfAuthFailed(response)) return;
            if (response.ok) {
                setConversation(response.content.conversation);
            }
            else {
                openModal(ctx, {
                    content: () => (
                        <ModalActionResultTemplate
                            success={false}
                            errorText="Σφάλμα ανάκτησης συνομιλίας."
                        />
                    )
                });
            }
            setLoading(false);
        });
    }, [props.conversationFetcher])

    useEffect(() => {
        fetchConversation();
    }, [fetchConversation]);

    function sendMessage(text: string){
        if (conversation) {
            setLoading(true);

            sendMessageToConversation(conversation.id, text)
            .then(response => {
                if (navigateIfAuthFailed(response)) return;
                if (response.ok) {
                    setConversation({
                        ...conversation,
                        messages: [
                            ...conversation.messages,
                            response.content.message
                        ]
                    })
                }
                else {
                    openModal(ctx, {
                        content: () => (
                            <ModalActionResultTemplate
                                success={false}
                                errorText="Σφάλμα αποστολής Μηνύματος."
                            />
                        )
                    });
                }
                setLoading(false);
            });
        }
    };

    return (
        <div className="flex flex-col gap-2 w-full relative">
            <LoadingSpinner
                customTwBgColor="bg-white/60"
                visible={loading}
                coverParent={true}
                text=""
            />
            {
                conversation &&
                <div className="w-full flex justify-between items-center">
                    <div className="flex flex-col items-start">
                        <Link 
                            to={(
                                props.isGuestSide ?
                                ORDERED_BASE_ROLE_PATHS.GUEST
                                :
                                ORDERED_BASE_ROLE_PATHS.HOST
                            ) + `/property/${conversation?.propertyId}`}
                            className="text-xl font-bold underline hover:text-dark-petrol"
                        >
                            {conversation?.propertyName}
                        </Link>
                        <span>
                            {'Επικοινωνία με '}
                            {
                                props.isGuestSide ? 
                                <>
                                <b>{conversation?.hostUsername}</b> (οικοδεσπότης)
                                </>
                                :
                                <>
                                <b>{conversation?.guestUsername}</b> (ενοικιαστής)                            
                                </>
                            }
                        </span>
                    </div>
                    {
                        !props.isGuestSide &&
                        <button 
                            onClick={props.onDelete}
                            className="
                                flex gap-2 justify-center items-center
                                rounded-lg py-1 px-3
                                duration-200 bg-red-600 text-white hover:bg-red-700
                            "
                        >
                            <FontAwesomeIcon icon={faTrashAlt}/>
                            Διαγραφή Συνομιλίας
                        </button>                        
                    }
                </div>
            }
            <div className="w-full flex justify-center">
                <PrimaryButton onClick={fetchConversation}>
                    <FontAwesomeIcon icon={faRefresh} className="mr-2"/>
                    Ανανέωση Συνομιλίας
                </PrimaryButton>
            </div>
            <MessagesContainer messages={conversation?.messages ?? []}/>
            <SendMessageForm
                onSend={text => sendMessage(text)}
            />
        </div>
    );
}
