import { useContext } from "react";
import { AppContext } from "../AppContext";

export function UserInfo(){
    const {
        state: { businessContext }
    } = useContext(AppContext);
    
    return(
        <div className="flex flex-col ml-10 h-2/3 gap-y-10">
            <div className="flex justify-start text-2xl">
                Προσωπικά Στοιχεία
            </div>
            <div className="flex justify-between gap-10 border-b-2">
                <h2>Όνομα Χρήστη</h2>
                <h2>{businessContext.userContext?.firstName} {businessContext.userContext?.lastName}</h2>
                <button className="underline italic">Επεξεργασία</button>
                
            </div>
            <div className="flex justify-between gap-10 border-b-2">
                <h2>Διεύθυνση Email</h2>
                <h2>{businessContext.userContext?.email}</h2>
                <button className="underline italic">Επεξεργασία</button>
            </div>
            <div className="flex justify-between gap-10 border-b-2">
                <h2>Αριθμός Τηλεφώνου</h2>
                <h2>{businessContext.userContext?.mobileNumber}</h2>
                <button className="underline italic">Επεξεργασία</button>
            </div>
            {/* <div className="flex justify-between gap-10 border-b-2">
                <h2>Ημερομηνία Γέννησης</h2>
                <button className="underline italic">Επεξεργασία</button>
            </div>
            <div className="flex justify-between gap-10 border-b-2">
                <h2>Διεύθυνση</h2>
                <button className="underline italic">Επεξεργασία</button>
            </div>
            <div className="flex justify-between gap-10 border-b-2">
                <h2>Έγγραφα Ταυτοποίησης</h2>
                <button className="underline italic">Επεξεργασία</button>
            </div> */}
        </div>
    )
}