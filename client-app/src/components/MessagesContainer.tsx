import { useEffect, useRef } from "react";
import { MessageTile } from "./MessageTile";
import { Conversation } from "../api/entities/Conversation";

interface MessagesContainerProps{
    conversation: Conversation
}

export function MessagesContainer(props:MessagesContainerProps){

    const domContainer = useRef<HTMLDivElement>(null);
    const userAvatars = {
        [props.conversation.guestUsername]: props.conversation.guestImg?.imgId,
        [props.conversation.hostUsername]: props.conversation.hostImg?.imgId
    };

    useEffect(() => {
        if (domContainer.current) {
            domContainer.current.scrollTop = domContainer.current.scrollHeight;
        }
    }, [props.conversation.messages.length])

    return (
        <div
            className="rounded-xl h-96 w-full overflow-hidden"
        >
            <div 
                ref={domContainer}
                className="overflow-y-scroll h-full w-full bg-slate-100 px-2 pt-2"
            >
                <div className="flex flex-col justify-end w-full min-h-full h-max">
                {
                    props.conversation.messages.map(
                        (msg, i) => msg.text != "" && (
                            <MessageTile 
                                key={i} 
                                msg={msg}
                                userAvatars={userAvatars}
                            />
                        )
                    )
                }
                </div>
            </div>
        </div>
    )
}
