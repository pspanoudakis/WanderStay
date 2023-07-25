package com.backend.server.entities.users;

import jakarta.persistence.Embeddable;

@Embeddable
public class RoleEntityId {
    String username;

    @Override
    public boolean equals(Object obj) {
        if (obj instanceof RoleEntityId) {
            return this.username.equals(((RoleEntityId)obj).username);
        }
        return false;
    }

    @Override
    public int hashCode() {
        return this.username.hashCode();
    }
}
