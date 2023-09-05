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
import { faRefresh } from "@fortawesome/free-solid-svg-icons";

interface ChatContainerProps {
    conversationFetcher: () => 
        Promise<FetchDataResponse<{
            conversation: Conversation}
        >>
}

export function ChatContainer(props: ChatContainerProps){

    const ctx = useContext(AppContext);

    const [loading, setLoading] = useState(true);
    const [conversation, setConversation] = useState<Conversation>();

    const fetchConversation = useCallback(() => {
        setLoading(true);
        props.conversationFetcher()
        .then(response => {
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

    return(
        <div className="flex flex-col gap-2 w-full relative">
            <LoadingSpinner
                customTwBgColor="bg-white/60"
                visible={loading}
                coverParent={true}
                text=""
            />
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
