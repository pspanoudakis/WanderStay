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
@Table(name = "_public_transport_accesses")
public class PublicTransportAccesses {
    @JsonIgnore
    @Id
    private Long id;

    @MapsId
    @OneToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(nullable = false, name = "property_id")
    @JsonIgnore
    private Property property;

    private boolean accessedByTram;
    private boolean accessedByBus;
    private boolean accessedByMetro;
    private boolean accessedByRailway;

    public void update(PublicTransportAccesses other) {
        accessedByTram = other.accessedByTram;
        accessedByBus = other.accessedByBus;
        accessedByMetro = other.accessedByMetro;
        accessedByRailway = other.accessedByRailway;
    }
}
