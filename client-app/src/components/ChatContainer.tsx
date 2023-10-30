import { MessagesContainer } from "./MessagesContainer";
import { SendMessageForm } from "./SendMessageForm";
import { Conversation } from "../api/entities/Conversation";
import { sendMessageToConversation } from "../api/fetchRoutines/conversationAPI";
import { useCallback, useContext, useEffect, useState } from "react";
import { LoadingSpinner } from "./LoadingSpinner";
import { FetchDataResponse, createEndPointUrl } from "../api/fetchRoutines/fetchAPI";
import { AppContext, openModal } from "../AppContext";
import { ModalActionResultTemplate } from "./ModalActionResultTemplate";
import { PrimaryButton } from "./PrimaryButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRefresh, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { ORDERED_BASE_ROLE_PATHS } from "../pages/pathConstants";
import { useNavigateIfAuthenticationFailed } from "../hooks/useNavigateIfAuthenticationFailed";
import { StompSessionProvider, useSubscription } from "react-stomp-hooks";
import { Message } from "../api/entities/Message";
import { getJwt } from "../api/jwt/jwt";

type ChatSocketResponse = {
    ok: boolean,
    message: Message
};
function ChatSocketSubscriber(props: {
    subscriptionUrl: string,
    onNewMessage: (response: ChatSocketResponse) => void,
    onError?: (error: any) => void
}) {
    useSubscription(
        props.subscriptionUrl,
        response => {
            let msg: ChatSocketResponse | undefined;
            try {
                msg = JSON.parse(response.body) as ChatSocketResponse;
            } catch (error) {
                console.error(`Error while parsing socket response as JSON: ${error}`);
                props.onError?.(error);
            }
            if (msg) props.onNewMessage(msg);
        },
        {
            'login': `${getJwt()}`
        }
    );

    return null;
}

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
                            defaultErrorText="Σφάλμα ανάκτησης συνομιλίας."
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
                                defaultErrorText="Σφάλμα αποστολής Μηνύματος."
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
                    <StompSessionProvider
                        url={createEndPointUrl(`/ws-message`, { useSocket: true })}
                    >
                        <ChatSocketSubscriber
                            subscriptionUrl={`/conversation/ws/${conversation.id}`}
                            onNewMessage={res => {
                                console.log(res);
                                setConversation({
                                    ...conversation,
                                    messages: [
                                        ...conversation.messages,
                                        res.message
                                    ]
                                })
                            }}
                        />
                    </StompSessionProvider>
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
            <MessagesContainer 
                conversation={conversation ?? {
                    messages: [],
                    guestImg: null,
                    hostImg: null,
                    guestUsername: '',
                    hostUsername: '',
                    id: -1,
                    propertyId: -1,
                    propertyName: ''
                }}
            />
            <SendMessageForm
                onSend={text => sendMessage(text)}
            />
        </div>
    );
}
