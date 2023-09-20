import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { APP_PALLETE } from "./utils/colorConstants";

export function HostNotActiveModalWarning({isGuest}: {isGuest: boolean}) {
	return (
		<div className="flex flex-col gap-4 p-4">
			<FontAwesomeIcon
				icon={faCircleExclamation} color={APP_PALLETE['main-petrol']} size="4x"
			/>
			<span className="text-xl font-light text-center">
				O λογαριασμός σας ως Oικοδεσπότης είναι προς το παρόν απενεργοποιημένος. 
			{
                isGuest && ' Mπορείτε να περιηγηθείτε στο WanderStay ως Ενοικιαστής.'
            }
			</span>
		</div>
	)
}
