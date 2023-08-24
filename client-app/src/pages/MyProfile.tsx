import { useContext } from "react";
import { AppContext } from "../AppContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faIdCardClip, faLock, faCreditCard, faComments } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";


export function MyProfile(){

    const {
        state: { businessContext }
    } = useContext(AppContext);

    return (
        businessContext.userContext ? (
            <div className="flex flex-col items-center w-full ml-10 h-2/3 gap-y-10">
                <div className="flex flex-col items-start w-full">
                    <b><h1 className="text-xl">Ρυθμίσεις Λογαριασμού</h1></b>
                    <h1>Welcome {businessContext.userContext.username}</h1>
                </div>
                <div className="flex flex-col items-center w-full h-36 gap-y-20">
                    <div className="flex w-2/3 h-60 justify-between gap-20">
                        <div className="flex border-2 border-gray-200 w-2/3 justify-center p-5 rounded-2xl">
                            <div className="flex gap-5">
                                <FontAwesomeIcon icon={faIdCardClip} className="text-dark-petrol text-3xl"/>
                                <div>
                                    <b><Link to="/profile/userInfo">Προσωπικά Στοιχεία</Link></b>
                                    <h4 className="text-sm">Τα προσωπικά σας στοιχεία και πώς μπρούμε να επικοινωνήσουμε μαζί σας</h4>
                                </div>
                            </div>
                            
                        </div>
                        <div className="flex border-2 border-gray-200 w-2/3 justify-center p-5 rounded-2xl">
                            <div className="flex gap-5">
                                <FontAwesomeIcon icon={faLock} className="text-dark-petrol text-3xl"/>
                                <div>
                                <b><Link to="/">Ασφάλεια</Link></b>
                                    <h4 className="text-sm">Προσαρμόστε ρυθμίσεις ασφαλείας και διαχειριστείτε τους κωδικούς σας</h4>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                    <div className="flex w-2/3 h-60 justify-between gap-20">
                        <div className="flex border-2 border-gray-200 w-2/3 justify-center p-5 rounded-2xl">
                            <div className="flex gap-5">
                                <FontAwesomeIcon icon={faCreditCard} className="text-dark-petrol text-3xl"/>
                                <div>
                                <b><Link to="/">Πληρωμές</Link></b>
                                    <h4 className="text-sm">Διαχειριστείτε τα στοιχεία πληρωμής σας και δείτε όλες τις προηγούμενες πληρωμές σας.</h4>
                                </div>
                            </div>
                            
                        </div>
                        <div className="flex border-2 border-gray-200 w-2/3 justify-center p-5 rounded-2xl">
                            <div className="flex gap-5">
                                <FontAwesomeIcon icon={faComments} className="text-dark-petrol text-3xl"/>
                                <div>
                                <b><Link to="/">Ενημερώσεις και Μηνύματα</Link></b>
                                    <h4 className="text-sm">Δείτε τις ειδοποιήσεις σας καθώς και μηνύματα με τον οικοδεσπότη σας.</h4>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        )
        :
        null
    )
}
