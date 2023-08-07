import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

interface CustomSliderProps{
    marks : {value:number, label:string}[],
    value? : number,
    setIsChecked : (newValue? : number) => void,
}

export function CustomSlider(props:CustomSliderProps){
    return(
        <Box sx={{ width: 300 }}>
        <Slider 
            aria-label="Custom marks"
            defaultValue={20}
            step={10}
            valueLabelDisplay="auto"
            marks={props.marks}
        />
        </Box>
    )
}
