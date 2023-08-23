import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { MapComponent } from "../components/MapComponent";
import { PropertyAmenitiesSection } from "../components/PropertyAmenitiesSection";
import { PropertyAmenity, PropertyAmenityFlags, PropertyDetailedAmenities, PropertyDetailedRules, PropertyRule, PropertyRuleFlags } from "../api/entities/propertyEnums";
import { PropertyRulesSection } from "../components/PropertyRulesSection";
import { DescriptionSection } from "../components/DescriptionSection";
import { PicturesGuestSection } from "../components/PicturesGuestSection";
import { TitleSection } from "../components/TitleSection";
import { AddressSection } from "../components/AddressSection";
import { NumericAmentitiesSection } from "../components/NumericAmenitiesSection";

const IS_EDITABLE = true

export function PropertyPage(){
    const pictures = [12,13,14]
    const [markerPosition, setMarkerPosition] = useState({lat: 13.084622, lng: 80.248357});
    const [title, setTitle] = useState("Title")
    const [textField, setTextField] = useState("description")
    const [address, setAddress] = useState({
        ad: "Kromnis 9",
        city: "Drosia",
        country: "Greece"
    })
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
            editable={IS_EDITABLE}
            setTitle={setTitle}
            title={title}
        />
        <PicturesGuestSection
            pictureList={pictures}
        />
        <DescriptionSection
            editable={IS_EDITABLE}
            setText={setTextField}
            text={textField}
        />

        <NumericAmentitiesSection
            editable={IS_EDITABLE}
            field={amenities}
            setAmenityFlags={setAmenities}
        />
        <div className="flex gap-2">
            <PropertyAmenitiesSection
                editable={IS_EDITABLE}
                amenityFlags={{
                    ...Object.values(PropertyAmenity).reduce(
                        (flags, amenity) => {
                            flags[amenity] = amenities[amenity];
                            return flags;
                        },
                        {} as PropertyAmenityFlags
                    ),
                }}
                setAmenityFlags={
                    (flags) => setAmenities({
                        ...amenities,
                        ...flags
                    })
                }
            />
            <PropertyRulesSection
                editable={IS_EDITABLE}
                ruleFlags={{
                    ...Object.values(PropertyRule).reduce(
                        (flags, rule) => {
                            flags[rule] = rules[rule];
                            return flags;
                        },
                        {} as PropertyRuleFlags
                    ),
                }}
                setRuleFlags={
                    (flags) => setRules({
                        ...rules,
                        ...flags
                    })
                }
            />
        </div>
       
        <AddressSection
            editable={IS_EDITABLE}
            address={address.ad}
            city={address.city}
            country={address.country}
            //setAddress={setAddress}
        />
        <span className="font-mono">{JSON.stringify(markerPosition)}</span>
        <MapComponent 
            position={markerPosition}
            editable={IS_EDITABLE} 
            setPosition={setMarkerPosition}            
        />
        </div>
    )
}