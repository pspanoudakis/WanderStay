import { PropertyRuleFlags } from "../api/entities/propertyEnums"
import { PropertyFlagsCheckList } from "./PropertyFlagsCheckList"

interface PropertyRulesSectionProps{
    ruleFlags: PropertyRuleFlags,
    setRuleFlags?: (flags: PropertyRuleFlags) => void,
    editable: boolean
}

export function PropertyRulesSection(props: PropertyRulesSectionProps){
    return(
        <div className="flex flex-col items-start border-2 border-main-petrol rounded-md py-2 px-3 gap-2 w-3/5">
            <div className='text-xl font-bold mb-2'>Κανόνες Σπιτιού</div>
            <PropertyFlagsCheckList
                editable={props.editable}
                fieldFlags={props.ruleFlags}
                setFieldFlags={props.setRuleFlags}
            />
        </div>
    )
}