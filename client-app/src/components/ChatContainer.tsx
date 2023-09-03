import { useState } from "react";
import { MessagesContainer } from "./MessagesContainer";
import { SendMessage } from "./SendMessage";


export function ChatContainer(){
    const[message,setMessage] = useState({
        sender: "admin",
        text: "hello"
    })

    const[arrayMessages, setArrayMessages] = useState([{sender: "", text: ""}])

    function addItem(value : {sender: string, text: string}){
        const nextVal = value;
        arrayMessages.push(nextVal);
        setArrayMessages(arrayMessages);
      };

    return(
        <div className="flex flex-col gap-2 w-2/3">
            <MessagesContainer msg={arrayMessages}/>
            <SendMessage
                setMessage={
                        (sender ,text)=> {
                                    setMessage({...message, text:text})
                                    addItem({sender,text})
                                }
                            }
            />
        </div>
    )
}