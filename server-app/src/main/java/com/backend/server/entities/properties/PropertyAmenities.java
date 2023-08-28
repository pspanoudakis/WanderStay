package com.backend.server.entities.properties;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
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

    @JsonIgnore
    @Id
    private Long id;

    @MapsId
    @OneToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(nullable = false, name = "property_id")
    @JsonIgnore
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

    public void update(PropertyAmenities other) {
        hasWifi = other.hasWifi;
        hasRefrigerator = other.hasRefrigerator;
        hasHeating = other.hasHeating;
        hasKitchen = other.hasKitchen;
        hasTv = other.hasTv;
        hasElevator = other.hasElevator;
        hasLounge = other.hasLounge;
        hasParking = other.hasParking;
        numBeds = other.numBeds;
        numBedrooms = other.numBedrooms;
        numBathrooms = other.numBathrooms;
    }
}
