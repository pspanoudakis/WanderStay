import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { PropertyType } from '../api/entities/propertyEnums';
import { PropertyTypeLabels } from './utils/propertyFieldLabels';

interface PropertyTypeProps{
    editable: boolean,
    setType?: (newType: PropertyType) => void, 
    type: PropertyType
}

export default function PropertyTypeSection(props: PropertyTypeProps) {
  return (
    <div className='flex items-start w-full'>
      {
        props.editable ?         
        <div className='flex flex-col items-start'>
          <FormLabel id="demo-row-radio-buttons-group-label">Τύπος Καταλύματος</FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            value={props.type}
            onChange={(e) => {
                props.setType?.(e.target.value as PropertyType)
            }}
          >
          {
            Object.values(PropertyType).map(type => (
              <FormControlLabel value={type} control={<Radio />} label={PropertyTypeLabels[type].label} />
            ))
          }
          </RadioGroup>
        </div>        
        :
        <div className="flex gap-2 items-center text-lg">
          {
            PropertyTypeLabels[props.type].icon ??
            <FontAwesomeIcon icon={faHouse}/>
          }
          <span>{PropertyTypeLabels[props.type].label} </span>
        </div>
      }       
    </div>    
  );
}
