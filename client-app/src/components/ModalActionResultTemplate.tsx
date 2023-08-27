import { faCircleCheck, faCircleXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

type ModalActionResultTemplateProps = {
    success: boolean,
    successText?: string,
    errorText?: string,
}

export function ModalActionResultTemplate({
    success,
    successText,
    errorText
}: ModalActionResultTemplateProps) {
    return (
        <div className="flex flex-col gap-4 p-4">
            <FontAwesomeIcon 
                icon={success ? faCircleCheck : faCircleXmark}
                color={success ? 'green' : 'red'}
                size="4x"
            />
            <span className="text-2xl font-light">
                {success ?
                    (successText ?? 'Η ενέργειά σας ολοκληρώθηκε επιτυχώς.')
                    :
                    (errorText ?? 'Δυστυχώς, η ενέργειά σας δεν μπόρεσε να ολοκληρωθεί.')
                }
            </span>
        </div>
    )
}
