import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

interface CustomSliderProps{
    marks: Array<{
        value: number, 
        label: string
    }>,
    value?: number,
    setValue: (newValue : number) => void,
}

export function CustomSlider(props: CustomSliderProps){
    return (
        <div className='w-full px-8 flex justify-center py-2'>
            <Slider 
                aria-label="Custom marks"
                step={10}
                valueLabelDisplay="auto"
                marks={props.marks}
                min={0}
                max={props.marks[Math.max(props.marks.length - 1, 0)].value ?? 100}
                value={props.value}
                onChange={(_, val) => (
                    props.setValue(val instanceof Array ? val[0] : val)
                )}            
            />
        </div>
    )
}
