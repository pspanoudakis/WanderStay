import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { MapComponent } from "../components/MapComponent";
import { PropertyAmenitiesSection } from "../components/PropertyAmenitiesSection";
import { PropertyAmenity, PropertyAmenityFlags, PropertyRule, PropertyRuleFlags } from "../api/entities/propertyEnums";
import { PropertyRulesSection } from "../components/PropertyRulesSection";
import { DescriptionSection } from "../components/DescriptionSection";
import { PicturesGuestSection } from "../components/PicturesGuestSection";

export function PropertyPage(){
    const pictures = [12,13,14]
    const [markerPosition, setMarkerPosition] = useState({lat: 13.084622, lng: 80.248357});
    const [textField, setTextField] = useState("description")
    const [rules, setRules] = useState(
        Object.values(PropertyRule).reduce(
            (filters, rule) => {
                filters[rule] = false;
                return filters;
            },
            {} as PropertyRuleFlags
        )
    )

    const [amenities, setAmenities] = useState(
        Object.values(PropertyAmenity).reduce(
            (filters, amenity) => {
                filters[amenity] = false;
                return filters;
            },
            {} as PropertyAmenityFlags
        )
    )
    
    return(
        <div className="flex flex-col w-full gap-2">
        <PicturesGuestSection
            pictureList={pictures}
        />
        <DescriptionSection
            editable={true}
            setText={setTextField}
            text={textField}
        />
        <PropertyAmenitiesSection
            editable={false}
            amenityFlags={amenities}
            setAmenityFlags={setAmenities}
        />
        <PropertyRulesSection
            editable={true}
            ruleFlags={rules}
            setRuleFlags={setRules}
        />
        <span className="font-mono">{JSON.stringify(markerPosition)}</span>
        <MapComponent 
            position={markerPosition}
            editable={true} 
            setPosition={setMarkerPosition}            
        />
        </div>
    )
}