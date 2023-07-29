package com.backend.server.entities.properties;

public enum PropertyType {

    PRIVATE_ROOM("PRIVATE_ROOM"),

    SHARED_ROOM("SHARED_ROOM"),

    PRIVATE_PROPERTY("PRIVATE_PROPERTY");

    private String literal;

    private PropertyType(String s) {
        this.literal = s;
    }

    @Override
    public String toString() {
        return literal;
    }

}
