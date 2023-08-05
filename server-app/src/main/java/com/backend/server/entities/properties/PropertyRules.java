package com.backend.server.entities.properties;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
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
@Table(name = "_property_rules")
public class PropertyRules {

    @JsonIgnore
    @Id
    private Long id;

    @MapsId
    @OneToOne(optional = false)
    @JoinColumn(nullable = false, name = "property_id")
    @JsonIgnore
    private Property property;

    private boolean smokingAllowed;
    private boolean petsAllowed;
    private boolean eventsAllowed;

    private short minReservationDays;
    private int baseDayCost;
    private int perGuestCost;
}
