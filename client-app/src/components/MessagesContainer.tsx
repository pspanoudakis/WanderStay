import { Messages } from "./Messages";

interface MessagesContainerProps{
    msg: {
        sender: string,
        text: string
    }[]
}

export function MessagesContainer(props:MessagesContainerProps){
    return(
        <div className="flex flex-col overflow-y-scroll h-96 w-full justify-end bg-slate-200 p-2">
            {
                props.msg.map(
                    ({sender, text}) => text!="" && <Messages sender={sender} text={text}/>
                )
            }
        </div>
    )
}