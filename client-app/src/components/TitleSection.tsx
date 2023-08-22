import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

interface TitleProps{
    title?: string,
    editable: boolean,
    setTitle?: (newText: string) => void
}

export function TitleSection(props: TitleProps){

    return (
        <div className='flex flex-col items-start gap-2 w-3/5 text-2xl font-bold'>
            {
                props.editable ?
                <Box
                component="form"
                sx={{
                  '& > :not(style)': { m: 1, fontSize: '20', fontWeight: 'bold'},
                }}
                noValidate
                autoComplete="off"
              >
                <TextField 
                fullWidth
                id="standard-basic" 
                label="Τίτλος" 
                variant="standard" 
                defaultValue={props.title} 
                sx={{font: '20', fontWeight: 'bold'}}
                inputProps={{ style: {fontWeight: 'bold', fontSize: '2em'} }}
                />
                </Box>
                :
                <span>{props.title}</span>
            }
        </div>
        
    );

}