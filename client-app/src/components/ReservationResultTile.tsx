import { Link } from "react-router-dom";
import { PropertyReservationResult } from "../api/responses/PropertyReservationResults";
import { Card, CardActionArea } from "@mui/material";
import { Img } from "./Img";
import { PropertyTypeLabels } from "./utils/propertyFieldLabels";
import { getBaseNavigationPath } from "./utils/getBaseNavigationPath";
import { useContext } from "react";
import { AppContext } from "../AppContext";

interface ReservationResultTile{
    reservationPreview: PropertyReservationResult
}

export function ReservationResultTile(props: ReservationResultTile){

    const reservationPreview = props.reservationPreview;
    const userContext = useContext(AppContext).state.businessContext.userContext;

    return (
        <Link to={`${getBaseNavigationPath(userContext?.roles)}/property/${reservationPreview.propertyId}`}>
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
                        <div className="flex flex-col items-start m-2 p-2 w-3/5 h-full">
                            <div className="flex w-full justify-between gap-8">
                                <span className='text-lg font-bold'>
                                    {reservationPreview.title}</span>
                            </div>
                            <div className='flex-1 w-full flex flex-col justify-between items-start border-l-2 border-main-petrol pl-3 mt-2'>
                                {/* <span className="text-sm">{propertyPreview.description}</span> */}
                                <span className="text-sm">{PropertyTypeLabels[reservationPreview.propertyType].label}</span>
                                <div className="flex w-full justify-between">
                                    
                                </div>
                            </div>
                        </div>
                    </CardActionArea>
                </Card>
            </div>
        </Link>     
    )

}