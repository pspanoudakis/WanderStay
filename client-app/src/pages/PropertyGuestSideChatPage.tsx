import { useParams } from "react-router-dom";
import { ChatContainer } from "../components/ChatContainer";
import { Conversation } from "../api/entities/Conversation";
import { useContext, useEffect, useState } from "react";
import { wait } from "../api/fetchRoutines/fetchAPI";
import { AppContext } from "../AppContext";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { Message } from "../api/entities/Message";

export function PropertyGuestSideChatPage() {
    const username = useContext(AppContext).state.businessContext.userContext?.username;
    const {propertyId} = useParams();

    const [loading, setLoading] = useState(true);
    const [conversation, setConversation] = useState<Conversation>();

    function sendMessage(text: string){

        if (conversation) {
            setLoading(true);
    
            const msg: Message = {
                sentBy: username ?? '',
                sentOn: '',
                text
            };        
    
            wait(1000).then(() => {
                setConversation({
                    ...conversation,
                    messages: [
                        ...conversation.messages,
                        msg
                    ]
                })
                setLoading(false)
            });
        }

    };

    useEffect(() => {
        wait(1000).then(() => {
            setConversation({
                id: 1,
                guestUsername: 'guest',
                hostUsername: 'host',
                propertyName: 'property',
                messages: [
                    {
                        "sentBy": username ?? 'admin',
                        "sentOn": "2023-09-03 22:23",
                        "text": "back"
                    },
                    {
                        "sentBy": username ?? 'admin',
                        "sentOn": "2023-09-03 22:23",
                        "text": "back2"
                    },
                    {
                        "sentBy": username ?? 'admin',
                        "sentOn": "2023-09-03 22:23",
                        "text": "back3"
                    },
                    {
                        "sentBy": username ?? 'admin',
                        "sentOn": "2023-09-03 22:23",
                        "text": "back4"
                    },
                    {
                        "sentBy": username ?? 'admin',
                        "sentOn": "2023-09-03 22:23",
                        "text": "back5"
                    },
                    {
                        "sentBy": "guest",
                        "sentOn": "2023-09-03 22:18",
                        "text": "!hello again!"
                    },
                    {
                        "sentBy": username ?? 'admin',
                        "sentOn": "2023-09-03 22:08",
                        "text": "hello!"
                    },
                    {
                        "sentBy": "guest",
                        "sentOn": "2023-09-03 21:45",
                        "text": "hello world!"
                    }
                ]
            });
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
