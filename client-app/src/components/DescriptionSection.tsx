import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import { styled } from '@mui/system';
interface DescriptionProps{
    text?: string,
    editable: boolean,
    setText?: (newText: string) => void
}

export function DescriptionSection(props: DescriptionProps){

    return (
        <div className='flex flex-col items-start gap-2 w-1/2'>
            <div className='text-xl font-bold'>Περιγραφή</div>
            <TextareaAutosize
                minRows={6}
                maxRows={6} 
                placeholder={!props.editable ? "Ο/Η οικοδεσπότης δεν έχει δώσει περιγραφή." : "Εισάγετε Περιγραφή..."}
                defaultValue={props.text}
                className='flex w-full border-2 rounded-sm p-2 max-h-40 min-h-40 outline-none resize-none'
                readOnly={!props.editable}
                onChange={(e) => props.setText?.(e.target.value)}
            />
        </div>        
    );
}