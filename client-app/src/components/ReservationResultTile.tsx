import { Link } from "react-router-dom";
import { PropertyReservationResult } from "../api/responses/PropertyReservationResult";
import { Card, CardActionArea } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays, faUserCircle, faUsers, faSackDollar, faEuro} from "@fortawesome/free-solid-svg-icons";
import { Img } from "./Img";
import { ORDERED_BASE_ROLE_PATHS } from "../pages/pathConstants";

interface ReservationResultTile{
    reservationPreview: PropertyReservationResult
    isGuest?: boolean
}

export function ReservationResultTile(props: ReservationResultTile){
    const baseNavPath = props.isGuest ? ORDERED_BASE_ROLE_PATHS.GUEST : ORDERED_BASE_ROLE_PATHS.HOST;
    const reservationPreview = props.reservationPreview;
    return (
        <Link 
            to={`${baseNavPath}/property/${reservationPreview.propertyId}`}
        >
            <div className="border-2 border-main-petrol rounded-lg">
                <Card 
                    sx={{ 
                        display: "flex",
                        justifyContent:"space-between",
                        padding: '1rem'
                    }}
                >
                    <CardActionArea sx={{ display: "flex", justifyContent:"start"}}>
                        <Img 
                            imgId={reservationPreview.imgId}
                            height={160}
                            className='rounded-lg'
                            alt={`img${reservationPreview.propertyId}`} 
                        />
                        <div className="flex flex-col items-start p-2 w-3/5 h-full">
                            <div className="flex w-full justify-between gap-8">
                                <span className='text-xl font-bold'>
                                    {reservationPreview.title}</span>
                            </div>
                            <div className='flex-1 w-full flex flex-col justify-between items-start border-l-2 border-main-petrol pl-3 mt-2'>
                            {
                                props.isGuest ?                                    
                                <div className="flex justify-center gap-2 items-center">
                                    <FontAwesomeIcon icon={faUserCircle} className="text-dark-petrol"/>
                                    <span className="text-lg"><b>Οικοδεσπότης: </b> {reservationPreview.hostUsername}</span>
                                </div>
                                :                                    
                                <div className="flex justify-center gap-2 items-center">
                                    <FontAwesomeIcon icon={faUserCircle} className="text-dark-petrol"/>
                                    <span className="text-lg"><b>Ενοικιαστής:</b> {reservationPreview.guestUsername}</span>
                                </div>
                            }
                                <div className="flex justify-center gap-2 items-center">
                                    <FontAwesomeIcon icon={faUsers}  className="text-dark-petrol"/>
                                    <span className="text-lg"><b>Επισκέπτες:</b> {reservationPreview.numPersons}</span>
                                </div>
                                <div className="flex justify-center gap-2 items-center">
                                    <FontAwesomeIcon icon={faSackDollar} className="text-dark-petrol"/>
                                    <span className="text-lg"><b>Συνολική Τιμή:</b> {reservationPreview.totalPrice} <FontAwesomeIcon icon={faEuro} size="sm"/></span>
                                </div>
                                <div className="flex justify-center gap-2 items-center">
                                    <FontAwesomeIcon icon={faCalendarDays} className="text-dark-petrol"/>
                                    <span className="text-lg"><b>Άφιξη:</b> {reservationPreview.dateFrom}</span>
                                    <span className="text-lg"><b>Αναχώρηση:</b> {reservationPreview.dateTo}</span>
                                </div>
                            </div>
                        </div>
                    </CardActionArea>
                </Card>
            </div>
        </Link>     
    )

}