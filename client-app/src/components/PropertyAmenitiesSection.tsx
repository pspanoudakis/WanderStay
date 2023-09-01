import { PropertyAmenityFlags } from "../api/entities/propertyEnums"
import { PropertyFlagsCheckList } from "./PropertyFlagsCheckList"

interface PropertyAmenitiesSectionProps{
    amenityFlags: PropertyAmenityFlags,
    setAmenityFlags?: (flags: PropertyAmenityFlags) => void,
    editable: boolean
}

export function PropertyAmenitiesSection(props: PropertyAmenitiesSectionProps){
    return(
        <div className="flex flex-col items-start rounded-md py-2 px-3 gap-2 w-3/5">
            <div className='text-xl font-bold mb-2'>Παροχές</div>
            <div className="grid grid-cols-3 gap-4">
                <PropertyFlagsCheckList
                    editable={props.editable}
                    fieldFlags={props.amenityFlags}
                    setFieldFlags={props.setAmenityFlags}
                />
            </div>
            
        </div>
    )
}