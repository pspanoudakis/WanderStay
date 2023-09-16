import { PublicTransportAccessFlags } from "../api/entities/propertyEnums"
import { PropertyFlagsCheckList } from "./PropertyFlagsCheckList"

interface PropertyTransportSectionProps{
    flags: PublicTransportAccessFlags,
    setFlags?: (flags: PublicTransportAccessFlags) => void,
    editable: boolean
}

export function PropertyTransportSection(props: PropertyTransportSectionProps){
    return(
        <div className="flex flex-col justify-center items-start rounded-md py-2 px-3 gap-2 w-3/5">
            <div className='w-full text-xl font-bold mb-2'>Συγκοινωνίες</div>
            <div className="w-full flex flex-row justify-center gap-4">
                <PropertyFlagsCheckList
                    editable={props.editable}
                    fieldFlags={props.flags}
                    setFieldFlags={props.setFlags}
                />
            </div>
        </div>
    )
}
