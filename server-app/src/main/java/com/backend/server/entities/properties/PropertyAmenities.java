package com.backend.server.entities.properties;

import jakarta.persistence.Entity;
import jakarta.persistence.CascadeType;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.MapsId;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "_property_amenities")
public class PropertyAmenities {

    @EmbeddedId
    private PropertyFieldEntityId id;

    @MapsId("propertyId")
    @OneToOne(optional = false, cascade = {CascadeType.ALL})
    @JoinColumn(nullable = false, name = "property_id")
    private Property property;

    private boolean hasWifi;
    private boolean hasRefrigerator;
    private boolean hasHeating;
    private boolean hasKitchen;
    private boolean hasTv;
    private boolean hasElevator;
    private boolean hasLounge;
    private boolean hasParking;

    private byte numBeds;
    private byte numBedrooms;
    private byte numBathrooms;
}
