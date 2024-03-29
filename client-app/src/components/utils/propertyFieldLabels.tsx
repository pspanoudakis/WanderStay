import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PropertyAmenity, PropertyRule, PropertyType, PublicTransportAccess } from "../../api/entities/propertyEnums";
import { faBirthdayCake, faCouch, faDog, faElevator, faHouseLock, faKitchenSet, faParking, faPeopleRoof, faPersonShelter, faSmoking, faSnowflake, faTemperatureArrowUp, faTv, faWifi, faBus, faTrain, faTrainTram, faTrainSubway } from "@fortawesome/free-solid-svg-icons";

export type PropertyFieldLabelsType
<T extends PropertyRule | PropertyAmenity | PropertyType | PublicTransportAccess> = { 
    [field in T]: {
        label: string,
        icon?: JSX.Element
    } 
}

export const PropertyTypeLabels:PropertyFieldLabelsType<PropertyType> = {
    [PropertyType.PRIVATE_ROOM]: {
        label: 'Ιδιωτικό Δωμάτιο',
        icon: <FontAwesomeIcon icon={faPersonShelter}/>
    },
    [PropertyType.SHARED_ROOM]: {
        label: 'Κοινόχρηστο Δωμάτιο',
        icon: <FontAwesomeIcon icon={faPeopleRoof}/>
    },
    [PropertyType.PRIVATE_PROPERTY]: {
        label: 'Ολόκληρη Κατοικία',
        icon: <FontAwesomeIcon icon={faHouseLock}/>
    },
};

export const PropertyAmenityLabels:PropertyFieldLabelsType<PropertyAmenity> = {
    [PropertyAmenity.HAS_WIFI]: {
        label: "Wifi",
        icon: <FontAwesomeIcon icon={faWifi}/>
    },
    [PropertyAmenity.HAS_REFRIGERATOR]: {
        label: "Ψυγείο",
        icon: <FontAwesomeIcon icon={faSnowflake}/>
    },
    [PropertyAmenity.HAS_HEATING]: {
        label: "Θέρμανση",
        icon: <FontAwesomeIcon icon={faTemperatureArrowUp}/>
    },
    [PropertyAmenity.HAS_KITCHEN]: {
        label: "Κουζίνα",
        icon: <FontAwesomeIcon icon={faKitchenSet}/>
    },
    [PropertyAmenity.HAS_TV]: {
        label: "Tηλεόραση",
        icon: <FontAwesomeIcon icon={faTv}/>
    },
    [PropertyAmenity.HAS_ELEVATOR]: {
        label: "Ασανσέρ",
        icon: <FontAwesomeIcon icon={faElevator}/>
    },
    [PropertyAmenity.HAS_LOUNGE]: {
        label: "Καθιστικό",
        icon: <FontAwesomeIcon icon={faCouch}/>
    },
    [PropertyAmenity.HAS_PARKING]: {
        label: "Parking",
        icon: <FontAwesomeIcon icon={faParking}/>
    },
}

export const PropertyRuleLabels:PropertyFieldLabelsType<PropertyRule> = {
    [PropertyRule.SMOKING_ALLOWED]: {
        label: "Κάπνισμα",
        icon: <FontAwesomeIcon icon={faSmoking}/>
    },
    [PropertyRule.PETS_ALLOWED]: {
        label: "Κατοικίδια",
        icon: <FontAwesomeIcon icon={faDog}/>
    },
    [PropertyRule.EVENTS_ALLOWED]: {
        label: "Εκδηλώσεις / Πάρτι",
        icon: <FontAwesomeIcon icon={faBirthdayCake}/>
    },
}

export const PublicTransportAccessLabels:PropertyFieldLabelsType<PublicTransportAccess> = {
    [PublicTransportAccess.ACCESSED_BY_BUS]: {
        label: "Λεωφορείο",
        icon: <FontAwesomeIcon icon={faBus}/>
    },
    [PublicTransportAccess.ACCESSED_BY_METRO]: {
        label: "Μετρό",
        icon: <FontAwesomeIcon icon={faTrainSubway}/>
    },
    [PublicTransportAccess.ACCESSED_BY_RAILWAY]: {
        label: "Σιδηρόδρομος",
        icon: <FontAwesomeIcon icon={faTrain}/>
    },
    [PublicTransportAccess.ACCESSED_BY_TRAM]: {
        label: "Τραμ",
        icon: <FontAwesomeIcon icon={faTrainTram}/>
    },
}

export const PropertyFieldLabels = {
    ...PropertyTypeLabels,
    ...PropertyAmenityLabels,
    ...PropertyRuleLabels,
    ...PublicTransportAccessLabels
}
