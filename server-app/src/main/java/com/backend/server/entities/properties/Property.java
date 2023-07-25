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
@Table(name = "_properties")
public class Property {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    private Host host;

    @OneToMany(cascade = {CascadeType.ALL})
    @Builder.Default
    private List<AvailableTimeSlot> availableSlots = new LinkedList<AvailableTimeSlot>();

    @ManyToOne(optional = false)
    private City city;

    @OneToMany(cascade = {CascadeType.ALL})
    @Builder.Default
    private List<Image> images = new ArrayList<Image>();
}
