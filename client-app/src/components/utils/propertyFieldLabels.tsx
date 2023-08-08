import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PropertyAmenity, PropertyRule, PropertyType } from "../../api/entities/propertyEnums";
import { faBirthdayCake, faCouch, faDog, faElevator, faKitchenSet, faParking, faSmoking, faSnowflake, faTemperatureArrowUp, faTv, faWifi, faWifi3 } from "@fortawesome/free-solid-svg-icons";

export const PropertyTypeLabels:
{ 
    [amenity in PropertyType]: {
        label: string,
        icon?: JSX.Element
    } 
} = {
    [PropertyType.PRIVATE_ROOM]: {
        label: 'Ιδιωτικό Δωμάτιο'
    },
    [PropertyType.SHARED_ROOM]: {
        label: 'Κοινόχρηστο Δωμάτιο'
    },
    [PropertyType.PRIVATE_PROPERTY]: {
        label: 'Ολόκληρη Κατοικία'
    },
};

export const PropertyAmenityLabels:
{ 
    [amenity in PropertyAmenity]: {
        label: string,
        icon?: JSX.Element
    } 
} = {
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

export const PropertyRuleLabels:
{ 
    [amenity in PropertyRule]: {
        label: string,
        icon?: JSX.Element
    } 
} = {
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
