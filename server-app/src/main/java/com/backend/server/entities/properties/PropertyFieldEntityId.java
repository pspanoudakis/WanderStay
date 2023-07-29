package com.backend.server.entities.properties;

import jakarta.persistence.Embeddable;

@Embeddable
public class PropertyFieldEntityId {
    Long propertyId;

    @Override
    public boolean equals(Object obj) {
        if (obj instanceof PropertyFieldEntityId) {
            return this.propertyId.equals(((PropertyFieldEntityId)obj).propertyId);
        }
        return false;
    }

    @Override
    public int hashCode() {
        return this.propertyId.hashCode();
    }
}
