import { useEffect, useState } from "react";
import { MapComponent } from "../components/MapComponent";
import { PropertyAmenitiesSection } from "../components/PropertyAmenitiesSection";
import { PropertyAmenity, PropertyAmenityFlags, PropertyRule, PropertyRuleFlags } from "../api/entities/propertyEnums";
import { PropertyRulesSection } from "../components/PropertyRulesSection";
import { DescriptionSection } from "../components/DescriptionSection";
import { TitleSection } from "../components/TitleSection";
import { NumericAmentitiesSection } from "../components/NumericAmenitiesSection";
import { NumericRulesSection } from "../components/NumericRulesSection";
import { ContactHostSection } from "../components/ContactHostSection";
import { ReviewsSection } from "../components/ReviewsSection";
import { PropertyAvailableSlotsSelectorSection } from "../components/PropertyAvailableSlotsSelectorSection";
import { LocationSection } from "../components/LocationSection";
import { WriteReview } from "../components/WriteReview";
import PropertyTypeSection from "../components/PropertyTypeSection";
import { ImagesCarousel } from "../components/ImagesCarousel";
import { PropertyImageSelectorSection } from "../components/PropertyImageSelectorSection";
import { PropertyDetailsResponse } from "../api/responses/PropertyDetailsResponse";
import { getPropertyDetails } from "../api/fetchRoutines/propertyAPI";
import { LoadingSpinner } from "../components/LoadingSpinner";

type PropertyPageProps = {
    isEditable: boolean,
    propertyId: number
}

type PropertyDetails = PropertyDetailsResponse["propertyDetails"]

export function PropertyPage({ isEditable, propertyId }: PropertyPageProps){
    const [loading, setLoading] = useState(true);

    const [property, setProperty] = useState<PropertyDetails>();

    useEffect(() => {
        getPropertyDetails(propertyId)
        .then(response => {
            if (response.ok) {
                setProperty(response.content.propertyDetails);
            }
            setLoading(false);
        })
    }, [propertyId])

    function updatePropertyState<K extends keyof PropertyDetails>
    (key: K, value: PropertyDetails[K]) {
        if (property) {
            setProperty({
                ...property,
                [key]: value
            })
        }
    }
    
    return (
        loading ?
        <LoadingSpinner/>
        :
        (
            property ? (

                <div className="flex flex-col w-full gap-7 items-center">
                    <TitleSection
                        editable={isEditable}
                        setTitle={t => updatePropertyState("title", t)}
                        title={property.title}
                    />
        
                    <PropertyTypeSection
                        editable={isEditable}
                        setType={t => updatePropertyState("propertyType", t)}
                        type={property.propertyType}
                    />
        
                    <div className="flex flex-row w-full gap-2">
                        {
                            isEditable ?
                            <>
                                <PropertyImageSelectorSection
                                    images={property.images}
                                    setImages={imgs => updatePropertyState("images", imgs)}
                                    propertyId={propertyId}
                                />
                                <PropertyAvailableSlotsSelectorSection
                                    selectedSlots={property.availableSlots}
                                    setSelectedSlots={slots => updatePropertyState("availableSlots", slots)}
                                />
                            </>
                            :
                            <>
                                <ImagesCarousel
                                    images={property.images}
                                />                    
                            </>
                        }
                    </div>
                    <div className="flex w-full gap-5 items-start">
                        <DescriptionSection
                            editable={isEditable}
                            text={property.description}
                            setText={t => updatePropertyState("description", t)}
                        />
                        <div className="grid auto-cols-auto gap-y-3 gap-x-4 flex-1">
                            <span className='col-span-2 text-xl font-bold text-start'>Βασικές Πληροφορίες</span>
                            <NumericAmentitiesSection
                                editable={isEditable}
                                amenities={property.amenities}
                                setAmenities={a => updatePropertyState("amenities", a)}
                            />
                            <NumericRulesSection
                                editable={isEditable}
                                rules={property.rules}
                                setRules={r => updatePropertyState("rules", r)}
                            />
                        </div>
                    </div>
        
                    <div className="flex gap-2 w-full">
                        <PropertyAmenitiesSection
                            editable={isEditable}
                            amenityFlags={{
                                ...Object.values(PropertyAmenity).reduce(
                                    (flags, amenity) => {
                                        flags[amenity] = property.amenities[amenity];
                                        return flags;
                                    },
                                    {} as PropertyAmenityFlags
                                ),
                            }}
                            setAmenityFlags={
                                (flags) => setProperty({
                                    ...property,
                                    amenities: {
                                        ...property.amenities,
                                        ...flags
                                    }
                                })
                            }
                        />
                        <PropertyRulesSection
                            editable={isEditable}
                            ruleFlags={{
                                ...Object.values(PropertyRule).reduce(
                                    (flags, rule) => {
                                        flags[rule] = property.rules[rule];
                                        return flags;
                                    },
                                    {} as PropertyRuleFlags
                                ),
                            }}
                            setRuleFlags={
                                (flags) => setProperty({
                                    ...property,
                                    rules: {
                                        ...property.rules,
                                        ...flags
                                    }
                                })
                            }
                        />
                    </div>
                
                    <LocationSection
                        editable={isEditable}
                        address={property.address}
                        city={property.city}
                        country={property.country}
                        setAddress={a => updatePropertyState("address", a)}
                        setCountry={c => updatePropertyState("country", c)}
                        setCity={c => updatePropertyState("city", c)}
                    />
                    <MapComponent 
                        position={{lat: property.latitude, lng: property.longitude}}
                        editable={isEditable} 
                        setPosition={pos => {
                            setProperty({
                                ...property,
                                latitude: pos.lat,
                                longitude: pos.lng
                            })
                        }}            
                    />
                    <ReviewsSection
                        propertyId={propertyId}
                    />
                    {
                        !isEditable && (
                            <>
                            <ContactHostSection
                                hostUsername={property.hostName}
                                propertyId={propertyId}
                            />
                            <WriteReview propertyId={propertyId}/>                        
                            </>
                        )
                    }    
                </div>
            )
            :
            <span>Το κατάλυμα δεν βρέθηκε.</span>
        )
    )
}
