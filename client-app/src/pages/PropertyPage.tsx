import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { MapComponent } from "../components/MapComponent";
import { PropertyAmenitiesSection } from "../components/PropertyAmenitiesSection";
import { PropertyAmenity, PropertyAmenityFlags, PropertyDetailedAmenities, PropertyDetailedRules, PropertyRule, PropertyRuleFlags } from "../api/entities/propertyEnums";
import { PropertyRulesSection } from "../components/PropertyRulesSection";
import { DescriptionSection } from "../components/DescriptionSection";
import { PicturesGuestSection } from "../components/PicturesGuestSection";
import { TitleSection } from "../components/TitleSection";

export function PropertyPage(){
    const pictures = [12,13,14]
    const [markerPosition, setMarkerPosition] = useState({lat: 13.084622, lng: 80.248357});
    const [title, setTitle] = useState("Title")
    const [textField, setTextField] = useState("description")
    const [rules, setRules] = useState({
        ...Object.values(PropertyRule).reduce(
            (filters, rule) => {
                filters[rule] = false;
                return filters;
            },
            {} as PropertyDetailedRules
        ),
        baseDayCost: 0,
        minReservationDays: 0,
        perGuestCost: 0,
    })

    const [amenities, setAmenities] = useState({
        ...Object.values(PropertyAmenity).reduce(
            (filters, amenity) => {
                filters[amenity] = false;
                return filters;
            },
            {} as PropertyDetailedAmenities
        ),
        numBeds: 0,
        numBedrooms: 0,
        numBathrooms: 0,
    })
    
    return(
        <div className="flex flex-col w-full gap-2">
        <TitleSection
            editable={true}
            setTitle={setTitle}
            title={title}
        />
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
            setAmenityFlags={
                (flags) => setAmenities({
                    ...amenities,
                    ...flags
                })
            }
        />
        <PropertyRulesSection
            editable={true}
            ruleFlags={rules}
            setRuleFlags={
                (flags) => setRules({
                    ...rules,
                    ...flags
                })
            }
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