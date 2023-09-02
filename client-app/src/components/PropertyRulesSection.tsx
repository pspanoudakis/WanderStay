import { PropertyRuleFlags } from "../api/entities/propertyEnums"
import { PropertyFlagsCheckList } from "./PropertyFlagsCheckList"

interface PropertyRulesSectionProps{
    ruleFlags: PropertyRuleFlags,
    setRuleFlags?: (flags: PropertyRuleFlags) => void,
    editable: boolean
}

export function PropertyRulesSection(props: PropertyRulesSectionProps){
    return(
        <div className="flex flex-col items-start rounded-md py-2 px-3 gap-2 w-3/5">
            <div className='text-xl font-bold mb-2'>Κανόνες Σπιτιού</div>
            <div className="flex flex-col gap-4">
                <PropertyFlagsCheckList
                    editable={props.editable}
                    fieldFlags={props.ruleFlags}
                    setFieldFlags={props.setRuleFlags}
                />
            </div>
        </div>
    )
}
