export enum PropertyType {
    PRIVATE_ROOM = "PRIVATE_ROOM",

    SHARED_ROOM = "SHARED_ROOM",

    PRIVATE_PROPERTY = "PRIVATE_PROPERTY",
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

export type PropertyAmenityFlags = {
    [amenity in PropertyAmenity]: boolean
}

export enum PropertyRule {
    SMOKING_ALLOWED = "smokingAllowed",
    PETS_ALLOWED = "petsAllowed",
    EVENTS_ALLOWED = "eventsAllowed",
}

export type PropertyRuleFlags = {
    [rule in PropertyRule]: boolean
}
