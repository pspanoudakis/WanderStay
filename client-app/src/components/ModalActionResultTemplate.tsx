import { faCircleCheck, faCircleXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { ErrorCodeDescriptions } from "./utils/errorCodeDescriptions";

type ModalActionResultTemplateProps = {
    success: boolean,
    successText?: string,
    defaultErrorText?: string,
    errorCode?: string,
}

export function ModalActionResultTemplate({
    success,
    successText,
    defaultErrorText,
    errorCode
}: ModalActionResultTemplateProps) {
    
    const createDescription = () => {
        if (success) {
            return successText ?? 'Η ενέργειά σας ολοκληρώθηκε επιτυχώς.';
        }
        else {
            return (
                ErrorCodeDescriptions[errorCode ?? ''] ?? (
                    defaultErrorText ?? 'Δυστυχώς, η ενέργειά σας δεν μπόρεσε να ολοκληρωθεί.'
                )
            );
        }
    }

    return (
        <div className="flex flex-col gap-4 p-4">
            <FontAwesomeIcon 
                icon={success ? faCircleCheck : faCircleXmark}
                color={success ? 'green' : 'red'}
                size="4x"
            />
            <span className="text-2xl font-light text-center">
                {createDescription()}
            </span>
        </div>
    )
}
