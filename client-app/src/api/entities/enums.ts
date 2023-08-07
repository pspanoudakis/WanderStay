export enum PropertyType {
    PRIVATE_ROOM = "PRIVATE_ROOM",

    SHARED_ROOM = "SHARED_ROOM",

    PRIVATE_PROPERTY = "PRIVATE_PROPERTY",
};

export const PropertyTypeLabels = {
    [PropertyType.PRIVATE_ROOM]: 'Ιδιωτικό Δωμάτιο',
    [PropertyType.SHARED_ROOM]: 'Κοινόχρηστο Δωμάτιο',
    [PropertyType.PRIVATE_PROPERTY]: 'Ολόκληρη Κατοικία',
};

export enum PropertyAmenity {
    HAS_WIFI = "hasWifi",
    HAS_REFRIGERATOR = "hasRefrigerator",
    HAS_HEATING = "hasHeating",
    HAS_KITCHEN = "hasKitchen",
    HAS_TV = "hasTv",
    HAS_ELEVATOR = "hasElevator",
    HAS_LOUNGE = "hasLounge",
    HAS_PARKING = "hasParking",
};

export const PropertyAmenityLabels = {
    [PropertyAmenity.HAS_WIFI]: "Wifi",
    [PropertyAmenity.HAS_REFRIGERATOR]: "Ψυγείο",
    [PropertyAmenity.HAS_HEATING]: "Θέρμανση",
    [PropertyAmenity.HAS_KITCHEN]: "Κουζίνα",
    [PropertyAmenity.HAS_TV]: "Tηλεόραση",
    [PropertyAmenity.HAS_ELEVATOR]: "Ασανσέρ",
    [PropertyAmenity.HAS_LOUNGE]: "Καθιστικό",
    [PropertyAmenity.HAS_PARKING]: "Parking",
}

export enum PropertyRule {
    SMOKING_ALLOWED = "smokingAllowed",
    PETS_ALLOWED = "petsAllowed",
    EVENTS_ALLOWED = "eventsAllowed",
}

export const PropertyRuleLabels = {
    [PropertyRule.SMOKING_ALLOWED]: "Κάπνισμα",
    [PropertyRule.PETS_ALLOWED]: "Κατοικίδια",
    [PropertyRule.EVENTS_ALLOWED]: "Εκδηλώσεις / Πάρτι",
}
