import { useEffect, useRef } from "react";
import { Message } from "../api/entities/Message";
import { MessageTile } from "./MessageTile";

interface MessagesContainerProps{
    messages: Message[]
}

export function MessagesContainer(props:MessagesContainerProps){

    const domContainer = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (domContainer.current) {
            domContainer.current.scrollTop = domContainer.current.scrollHeight;
        }
    }, [props.messages.length])

    return(
        <div
            className="rounded-xl h-96 w-full overflow-hidden"
        >
            <div 
                ref={domContainer}
                className="overflow-y-scroll h-full w-full bg-slate-100 px-2 pt-2"
            >
                <div className="flex flex-col justify-end w-full min-h-full h-max">
                {
                    props.messages.map(
                        (msg, i) => msg.text != "" && <MessageTile key={i} msg={msg}/>
                    )
                }
                </div>
            </div>
        </div>
    )
}
