import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { MapComponent } from "../components/MapComponent";


interface PropertyProps{
    propertyPreview: {
        propertyId: number,
        imgSrc: string,
        title :string,
        description: string,
        nofBeds: number,
        pricePerNight: number,
        totalPrice: number,
        reviewRate: number,
        nofReviews: number,
        dateFrom: Date,
        dateTo: Date,
        coordinateX: string,
        coordinateY: string
        id: number
    },
}

export function PropertyPage(){
    return(
        <div className="flex flex-col w-full">
        <MapComponent coordinateX={13.084622} coordinateY={80.248357}/>
        </div>
    )
}