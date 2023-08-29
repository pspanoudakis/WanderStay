import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faDoorOpen } from '@fortawesome/free-solid-svg-icons';

interface PropertyTypeProps{
    editable: boolean,
    choices: string[],
    setType?: (newType: string) => void, 
    type?: string
}

export default function PropertyType(props: PropertyTypeProps) {
  return (
    <div className='flex items-start'>
        {props.editable ? 
        
            <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">Επιλέξτε Τύπο Καταλύματος</FormLabel>
            <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            defaultValue={props.type}
            onChange={(e) => {
                props.setType?.(e.target.value.toString())
            }}
            >
            <FormControlLabel value={props.choices.at(0)} control={<Radio />} label={props.choices.at(0)} />
            <FormControlLabel value={props.choices.at(1)}  control={<Radio />} label={props.choices.at(1)}  />
            <FormControlLabel value={props.choices.at(2)}  control={<Radio />} label={props.choices.at(2)}  />
            </RadioGroup>
        </FormControl>
        
        :
        <div className="flex gap-2 items-center text-lg">
        <FontAwesomeIcon icon={faHouse}/>
        <span>{props.type} </span>
        </div>
    }
       
    </div>
    
  );
}