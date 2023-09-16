import { useContext, useEffect, useState } from "react";
import { MapComponent } from "../components/MapComponent";
import { PropertyAmenitiesSection } from "../components/PropertyAmenitiesSection";
import { PropertyAmenity, PropertyAmenityFlags, PropertyRule, PropertyRuleFlags, PropertyType, PublicTransportAccess, PublicTransportAccessFlags } from "../api/entities/propertyEnums";
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
import { PropertyDetails } from "../api/responses/PropertyDetailsResponse";
import { createOrUpdateProperty, getPropertyDetails, makePropertyReservation } from "../api/fetchRoutines/propertyAPI";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { PrimaryButton } from "../components/PrimaryButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faCheck } from "@fortawesome/free-solid-svg-icons";
import { AppContext, openModal } from "../AppContext";
import { ModalActionResultTemplate } from "../components/ModalActionResultTemplate";
import { useNavigate } from "react-router-dom";
import { ORDERED_BASE_ROLE_PATHS } from "../pages/pathConstants";
import { RoleType } from "../api/entities/RoleType";
import { PropertyConversationsSection } from "./PropertyConversationsSection";
import { PropertyTransportSection } from "./PropertyTransportSection";

type PropertyDetailsProps = {
    isEditable: boolean,
    propertyId?: number
}
export function PropertyDetailsView({ isEditable, propertyId }: PropertyDetailsProps){

    const ctx = useContext(AppContext);
    const searchContext = ctx.state.businessContext.searchContext;
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);

    const [property, setProperty] = useState<PropertyDetails>();

    useEffect(() => {
        if (propertyId) {
            getPropertyDetails(propertyId)
            .then(response => {
                if (response.ok) {
                    setProperty(response.content.propertyDetails);
                }
                setLoading(false);
            });
        }
        else {
            setProperty({
                propertyId: -1,
                address: '',
                amenities: {
                    hasElevator: false,
                    hasHeating: false,
                    hasKitchen: false,
                    hasLounge: false,
                    hasParking: false,
                    hasRefrigerator: false,
                    hasTv: false,
                    hasWifi: false,
                    numBathrooms: 0,
                    numBedrooms: 0,
                    numBeds: 0
                },
                availableSlots: [],
                city: null,
                country: null,
                description: '',
                hostName: '',
                images: [],
                propertyType: PropertyType.PRIVATE_PROPERTY,
                rules: {
                    baseDayCost: 0,
                    eventsAllowed: false,
                    minReservationDays: 1,
                    perGuestCost: 0,
                    petsAllowed: false,
                    smokingAllowed: false,
                },
                transport: {
                    accessedByBus: false,
                    accessedByMetro: false,
                    accessedByRailway: false,
                    accessedByTram: false,
                },
                spaceArea: 1,
                title: 'Νέο Κατάλυμα',
                latitude: 38.116828199666465, 
                longitude: 23.86143414444651,
                reviewsSummary: {
                    avgStars: 0,
                    reviewCount: 0
                }
            });
            setLoading(false);
        }
    }, [propertyId])

    const makeReservation = () => {
        setLoading(true);
        if (property) {
            makePropertyReservation(property.propertyId, {
                dateFrom: searchContext.dateFrom ?? '',
                dateTo: searchContext.dateTo ?? '',
                numPersons: searchContext.numPersons
            })
            .then(response => {
                openModal(ctx, {
                    content: () => (
                        <ModalActionResultTemplate
                            success={response.ok}
                            successText="H Κράτησή σας ολοκληρώθηκε επιτυχώς"
                            errorText="Σφάλμα καταχώρησης Κράτησης"
                        />
                    )
                })
                setLoading(false);
            })
        }
    }

    const saveProperty = () => {
        setLoading(true);
        if (property) {
            createOrUpdateProperty(property, property.propertyId > 0 ? property.propertyId : propertyId)
            .then(response => {
                if (response.ok) {
                    setProperty(response.content.propertyDetails)
                    if (!propertyId) {
                        navigate(`${ORDERED_BASE_ROLE_PATHS[RoleType.HOST]}/property/${response.content.propertyDetails.propertyId}`)
                    }
                }
                openModal(ctx, {
                    content: () => (
                        <ModalActionResultTemplate
                            success={response.ok}
                            successText="Επιτυχής ενημέρωση Καταλύματος"
                            errorText="Σφάλμα ενημέρωσης Καταλύματος"
                        />
                    )
                })
                setLoading(false);
            })
        }
    }

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
                    <div className="w-full flex justify-between items-center">
                        <TitleSection
                            editable={isEditable}
                            setTitle={t => updatePropertyState("title", t)}
                            title={property.title}
                        />
                        <PrimaryButton 
                            classExtras="rounded-xl py-2 px-4 text-xl"
                            onClick={isEditable ? saveProperty : makeReservation}
                        >
                        {
                            isEditable ?
                            <><FontAwesomeIcon className="pr-2" icon={faCheck}/>Αποθήκευση Αλλαγών</>
                            :
                            <><FontAwesomeIcon className="pr-2" icon={faBookmark}/>Κάνε Κράτηση</>
                        }
                        </PrimaryButton>
                    </div>
                    <PropertyTypeSection
                        editable={isEditable}
                        setType={t => updatePropertyState("propertyType", t)}
                        type={property.propertyType}
                    />
        
                    <div className={`flex ${isEditable ? 'flex-col w-7/12' : 'flex-row w-2/3'}  gap-5`}>
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
                            : (
                                (property.images.length > 0) &&
                                <ImagesCarousel
                                    images={property.images}
                                />
                            )
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
                    {
                        ((property.latitude && property.longitude) || isEditable) &&
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
                    }
                    {
                        propertyId &&
                        <>
                        <PropertyTransportSection
                            editable={isEditable}
                            flags={{
                                ...Object.values(PublicTransportAccess).reduce(
                                    (flags, access) => {
                                        flags[access] = property.transport[access];
                                        return flags;
                                    },
                                    {} as PublicTransportAccessFlags
                                ),
                            }}
                            setFlags={
                                (flags) => setProperty({
                                    ...property,
                                    transport: {
                                        ...property.transport,
                                        ...flags
                                    }
                                })
                            }
                        />
                        <ReviewsSection propertyId={propertyId}/>
                        {
                            isEditable ?
                            <PropertyConversationsSection propertyId={propertyId}/>
                            :
                            <>
                            <WriteReview propertyId={propertyId}/>                        
                            <ContactHostSection
                                hostUsername={property.hostName}
                                propertyId={propertyId}
                            />
                            </>
                        }                       
                        </>
                    }
                </div>
            )
            :
            <span>Το κατάλυμα δεν βρέθηκε.</span>
        )
    )
}
