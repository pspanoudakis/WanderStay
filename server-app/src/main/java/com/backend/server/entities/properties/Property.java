package com.backend.server.entities.properties;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

import com.backend.server.entities.cities.City;
import com.backend.server.entities.images.Image;
import com.backend.server.entities.users.Host;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
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
@Table(name = "_property")
public class Property {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    private Host host;

    @OneToMany(mappedBy = "property", cascade = {CascadeType.ALL})
    @Builder.Default
    private List<AvailableTimeSlot> availableSlots = new LinkedList<AvailableTimeSlot>();

    @ManyToOne(optional = false)
    private City city;
    
    @OneToMany
    @JoinTable(
        name = "_property_image",
        joinColumns = @JoinColumn(name = "property_id"),
        inverseJoinColumns = @JoinColumn(name = "image_id")
    )
    @Builder.Default
    private List<Image> images = new ArrayList<Image>();
}
