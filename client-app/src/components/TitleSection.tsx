import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

interface TitleProps{
    title?: string,
    editable: boolean,
    setTitle?: (newText: string) => void
}

export function TitleSection(props: TitleProps){

    return (
        <div 
            className='flex flex-col items-start gap-2 flex-1 text-2xl font-bold'
            style={{
                maxWidth: '35vw'
            }}
        >
            {
                props.editable ?
                    <TextField
                        className='w-full'
                        id="standard-basic" 
                        label="Τίτλος" 
                        variant="standard" 
                        inputProps={{ style: {fontWeight: 'bold', fontSize: '2em'} }}
                        value={props.title}
                        onChange={(e) => props.setTitle?.(e.target.value)}
                    />
                :
                <span className='text-4xl font-bold'>{props.title}</span>
            }
        </div>
        
    );

}
