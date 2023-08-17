import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

interface CheckboxWithLabelProps {
    label : string,
    isChecked : boolean,
    setIsChecked : (newValue : boolean) => void,
    icon? : JSX.Element
}

export function CheckboxWithLabel(props:CheckboxWithLabelProps){
    return(
        <FormControlLabel 
            control={
                <Checkbox
                    checked={props.isChecked}
                    onChange={e => props.setIsChecked(e.target.checked)}
                />
            } 
            label={
                <span>
                    {props.icon} {props.label}
                </span>
                
            }
        />
    )
}