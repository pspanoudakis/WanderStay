import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane} from '@fortawesome/free-solid-svg-icons'
import { useContext, useState } from 'react';
import { PrimaryButton } from './PrimaryButton';
import { AppContext } from '../AppContext';

interface SendMessageProps{
    setMessage: (sender:string, message:string) => void
}

export function SendMessage(props:SendMessageProps){
    const ctx = useContext(AppContext)
    const[messageText, setMessageText] = useState({
        sender: ctx.state.businessContext.userContext?.username ?? "default",
        text: ""
    })
    
    function onSubmit(){
        props.setMessage(messageText.sender,messageText.text)
        setMessageText({...messageText, text: ""})
    }

    return(
        <div className='flex gap-3 w-full max-h-16'>
            <TextareaAutosize
                    //style={{width: "80%"}}
                    minRows={4}
                    maxRows={4} 
                    placeholder="Γράψτε ένα μήνυμα..."
                    className='flex w-full border-2 rounded-sm p-2 max-h-16 min-h-16 outline-none resize-none'
                    onChange={(e) => {e.target.value === "" ? "Γράψτε ένα μήνυμα..." : setMessageText({...messageText, text:e.target.value})}}
                    value={messageText.text}
            />
            <PrimaryButton
                onClick={onSubmit} 
                disabled={messageText.text===""}
                classExtras='rounded-lg text-xl px-4 py-0.5 flex gap-3 items-center justify-center w-1/4'
            >
                Αποστολή
                <FontAwesomeIcon icon={faPaperPlane}/>
            </PrimaryButton>
        </div>
    )
}