import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { PropertyAmenity, PropertyFieldFlags, PropertyRule } from "../api/entities/propertyEnums";
import { CheckboxWithLabel } from "./CheckboxWithLabel";
import { PropertyFieldLabels } from "./utils/propertyFieldLabels";

interface PropertyFlagsProps<T extends PropertyRule | PropertyAmenity>{
    fieldFlags: PropertyFieldFlags<T>,
    setFieldFlags?: (flags: PropertyFieldFlags<T>) => void,
    editable: boolean
}

export function PropertyFlagsCheckList<T extends PropertyRule | PropertyAmenity>(
    props: PropertyFlagsProps<T>
){
    return (
        <>
        {
            Object.keys(props.fieldFlags).map((field, i) => {
                const key = field as T;
                return (
                    props.editable?
                        <CheckboxWithLabel
                            key={i}
                            label={PropertyFieldLabels[key].label}
                            icon={PropertyFieldLabels[key].icon}
                            isChecked={props.fieldFlags[key]}
                            setIsChecked={isChecked => 
                                props.setFieldFlags?.({
                                    ...props.fieldFlags,
                                    [field]: isChecked
                                })
                            }
                        />
                        :
                        <div key={i} className="flex flex-row gap-2 items-center">
                            <FontAwesomeIcon
                                icon={props.fieldFlags[key] ? faCircleCheck: faCircleXmark}
                                color={props.fieldFlags[key] ? "green" : "red"}
                                size="xl"
                            />
                            {PropertyFieldLabels[key].icon}
                            {PropertyFieldLabels[key].label}
                        </div>
                );
            })
        }
        </>
    );
}
