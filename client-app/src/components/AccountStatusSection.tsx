import { PrimaryButton } from "./PrimaryButton"
import { UserAccountStatusIndicator } from "./UserAccountStatusIndicator"

export function AccountStatusSection(props: {
    isActive: boolean,
    editable?: boolean,
    toggleIsActive?: () => void
}) {
    return (
        <>
        <div className="flex gap-2 justify-start items-center w-full">
            <span className="font-bold text-xl">Κατάσταση Οικοδεσπότη:</span>
            <UserAccountStatusIndicator isActive={props.isActive}/>
        </div>
        {
            props.editable &&
            <PrimaryButton onClick={props.toggleIsActive}>
            {props.isActive ? 'Απενεργοποίηση Λογαριασμού' : 'Ενεργοποίηση Λογαριασμού'}
            </PrimaryButton>
        }
        </>
    )
}
