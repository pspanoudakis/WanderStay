import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';

interface PropertyResultTileProps{
    imgSrc : string,
    title :string,
    description : string,
    nofBeds : number,
    pricePerNight : number,
    totalPrice : number,
    reviewRate : number,
    nofReviews : number
}

export function PropertyResultTile(props:PropertyResultTileProps){
   
    return (
        <div className="border-2 border-main-petrol w-96">
             <Card sx={{ display: "flex", justifyContent:"space-between"}}>
                <CardActionArea sx={{ display: "flex", justifyContent:"start"}}>
                    <CardMedia
                    component="img"
                    height="140"
                    image={props.imgSrc}
                    alt="hotel"
                    />
                   <div className="flex flex-col border-l-2 border-main-petrol items-start p-2 w-2/3">
                        <div className="flex justify-between gap-8">
                            <b><h1>{props.title}</h1></b>
                            <b><h1> <FontAwesomeIcon icon={faStar} size='lg' className="text-dark-petrol" />{props.reviewRate} {props.nofReviews}</h1></b>
                        </div>
                        <span className="text-sm">{props.description}</span>
                        <span className="text-sm">{props.nofBeds} κρεβάτια</span>
                        <div className="flex justify-between gap-8">
                            <span className="text-sm">{props.pricePerNight}$/διανυκτέρευση</span>
                            <b><h1>{props.totalPrice}$ </h1></b>
                        </div>
                        
                   </div>
                </CardActionArea>
            </Card>
        </div>
     
    )
}