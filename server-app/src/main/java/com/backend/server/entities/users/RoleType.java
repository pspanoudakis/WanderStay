package com.backend.server.entities.users;

public enum RoleType {

    GUEST("GUEST"),

    HOST("HOST"),

    ADMIN("ADMIN");

    private String literal;

    private RoleType(String s) {
        this.literal = s;
    }

    @Override
    public String toString() {
        return literal;
    }

}
