import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane} from '@fortawesome/free-solid-svg-icons'
import { FormEvent, useState } from 'react';

interface SendMessageProps{
    onSend: (message: string) => void
}

export function SendMessageForm(props:SendMessageProps){
    
    const[messageText, setMessageText] = useState("")
    
    function onSubmit(e: FormEvent<HTMLFormElement>){
        e.preventDefault();
        props.onSend(messageText);
        setMessageText("");
    }

    return(
        <form className='flex gap-3 w-full max-h-16' onSubmit={e => onSubmit(e)}>
            <TextareaAutosize
                minRows={4}
                maxRows={4} 
                placeholder="Γράψτε ένα μήνυμα..." 
                className='flex w-full border-2 rounded-sm p-2 max-h-16 min-h-16 outline-none resize-none'
                onChange={e => setMessageText(e.target.value)}
                value={messageText}
            />
            <button
                type='submit'
                disabled={messageText === ""}
                className='
                    bg-main-petrol duration-300 enabled:hover:bg-dark-petrol
                    disabled:bg-light-petrol
                    text-white font-semibold
                    rounded-lg text-xl px-4 py-0.5 flex gap-3 items-center justify-center w-1/4
                '
            >
                Αποστολή
                <FontAwesomeIcon icon={faPaperPlane}/>
            </button>
        </form>
    )
}
