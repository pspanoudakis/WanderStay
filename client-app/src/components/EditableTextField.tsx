import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

interface UserProfileProps{
    boxType: string,
    text?: string,
    setText?: (value : string) => void,
    edit: boolean,
}

export function EditableTextField(props: UserProfileProps){
    
    return(
        <div className="flex items-start">
        {
            props.edit?
                <Box
                component="form"
                sx={{
                '& > :not(style)': { m: 1, fontSize: '18', fontWeight: 'bold'},
                }}
                noValidate
                autoComplete="off"
                >
                    <TextField 
                        fullWidth
                        id="standard-basic" 
                        label={props.boxType}
                        variant="standard" 
                        inputProps={{ style: {fontWeight: 'bold', fontSize: '1.5em'} }}
                        value={props.text}
                        onChange={(e) => props.setText?.(e.target.value)}
                    />
                </Box>
            :
            <Box
                component="form"
                sx={{
                '& > :not(style)': { m: 1, fontSize: '18'},
                }}
                noValidate
                autoComplete="off"
                >
                <span className='text-xl font-bold'>{`${props.boxType + ":"}`}</span>
                {
                    props.text ?
                    <span className='text-lg '>{props.text}</span>
                    :
                    <span className='text-lg italic '>{`Προσθέστε ${props.boxType}`}</span>
                }
                
            </Box>
        }
        </div>
    )
}
