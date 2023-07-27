package com.backend.server.services;

public class RequiredRoleNotFoundException extends Exception {
    public RequiredRoleNotFoundException(String... targetRoleNames) {
        super("Required Role(s) [" + String.join(", ", targetRoleNames) + "] not found.");
    }
}
