import { Link } from "react-router-dom";
import { ORDERED_BASE_ROLE_PATHS } from "../pages/pathConstants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook } from "@fortawesome/free-brands-svg-icons/faFacebook";
import { faInstagram } from "@fortawesome/free-brands-svg-icons/faInstagram";
import { faGithub } from "@fortawesome/free-brands-svg-icons/faGithub";
import { faXTwitter } from "@fortawesome/free-brands-svg-icons/faXTwitter";
import { IconProp, text } from "@fortawesome/fontawesome-svg-core";


export function Footer() {
    return (
        <footer className="border-t-2 border-light-petrol w-full py-2 mt-auto flex flex-col justify-center items-center">
            <div className="flex justify-between w-1/2 mt-4 mb-6">
                <div className="flex flex-col items-start">
                    <span className="text-xl font-bold">Υποστήριξη</span>
                    <Link to={ORDERED_BASE_ROLE_PATHS.GUEST} className="text-lg hover:text-main-petrol">Κέντρο Βοήθειας</Link>
                    <Link to={ORDERED_BASE_ROLE_PATHS.GUEST} className="text-lg hover:text-main-petrol">Επιλογές Ακύρωσης</Link>
                    <Link to={ORDERED_BASE_ROLE_PATHS.GUEST} className="text-lg hover:text-main-petrol">Αναφορά Προβλήματος</Link>
                </div>
                <div className="flex flex-col items-start">
                    <span className="text-xl font-bold">Φιλοξενία</span>
                    <Link to={ORDERED_BASE_ROLE_PATHS.GUEST} className="text-lg hover:text-main-petrol">Φόρουμ Κοινότητας</Link>
                    <Link to={ORDERED_BASE_ROLE_PATHS.GUEST} className="text-lg hover:text-main-petrol">Κάντε το χώρο σας WanderStay</Link>
                </div>
                <div className="flex flex-col items-start">
                    <span className="text-xl font-bold">WanderStay</span>
                    <Link to={ORDERED_BASE_ROLE_PATHS.GUEST} className="text-lg hover:text-main-petrol">Απόρρητο</Link>
                    <Link to={ORDERED_BASE_ROLE_PATHS.GUEST} className="text-lg hover:text-main-petrol">Όροι</Link>
                    <Link to={ORDERED_BASE_ROLE_PATHS.GUEST} className="text-lg hover:text-main-petrol">Στοιχεία Εταιρείας</Link>
                </div>
            </div>
            <div className="flex justify-between p-3 w-2/3 items-center border-t-2 border-light-petrol">
                <Link
                    to={ORDERED_BASE_ROLE_PATHS.GUEST}
                    className="text-main-petrol font-bold text-3xl duration-300 hover:text-dark-petrol"
                    style={{
                        fontFamily: 'Pacifico'
                    }}
                >
                    WanderStay
                </Link>
                <div className="flex text-main-petrol gap-5">
                    <FontAwesomeIcon icon={faFacebook as IconProp} size="2xl"/>
                    <FontAwesomeIcon icon={faInstagram as IconProp} size="2xl"/>
                    <FontAwesomeIcon icon={faGithub as IconProp} size="2xl"/>
                    <FontAwesomeIcon icon={faXTwitter as IconProp} size="2xl"/>
                </div>
                
            </div>
        </footer>
    )
}
