import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { MapComponent } from "../components/MapComponent";

export function PropertyPage(){
    const [markerPosition, setMarkerPosition] = useState({lat: 13.084622, lng: 80.248357});
    
    return(
        <div className="flex flex-col w-full">
        <span className="font-mono">{JSON.stringify(markerPosition)}</span>
        <MapComponent 
            position={markerPosition}
            editable={true} 
            setPosition={setMarkerPosition}            
        />
        </div>
    )
}