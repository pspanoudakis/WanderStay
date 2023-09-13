package com.backend.server.entities.properties;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

import org.springframework.util.StringUtils;

import com.backend.server.entities.images.Image;
import com.backend.server.entities.locations.City;
import com.backend.server.entities.users.Host;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
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

    @OneToMany(
        mappedBy = "property",
        cascade = {CascadeType.ALL},
        orphanRemoval = true
    )
    @Builder.Default
    private List<AvailableTimeSlot> availableSlots = new LinkedList<AvailableTimeSlot>();

    @ManyToOne
    private City city;
    
    @OneToMany(
        orphanRemoval = true
    )
    @JoinTable(
        name = "_property_image",
        joinColumns = @JoinColumn(name = "property_id"),
        inverseJoinColumns = @JoinColumn(name = "image_id")
    )
    @Builder.Default
    private List<Image> images = new ArrayList<Image>();

    @OneToOne(
        // optional = false,
        mappedBy = "property",
        cascade = {CascadeType.ALL}
        // fetch = FetchType.EAGER
    )
    private PropertyRules rules;

    @OneToOne(
        // optional = false,
        mappedBy = "property",
        cascade = {CascadeType.ALL}
        // fetch = FetchType.EAGER
    )
    private PropertyAmenities amenities;

    @Column(nullable = false)
    private String name;

    @Enumerated(EnumType.STRING)
    private PropertyType type;

    @Lob
    private String description;

    private String address;

    private Double latitude;
    private Double longitude;

    @Min(1)
    @Max(30_000)
    private short spaceArea;

    @JsonIgnore
    public Long getMainImageId() {
        List<Image> images = this.getImages();
        if (images.size() == 0) {
            return null;
        }
        return images.stream()
            .filter(i -> i.isMain())
            .findFirst().orElseGet(() -> images.get(0))
            .getId();
    }

    @JsonIgnore
    public String getFullLocationString() {
        List<String> words = new ArrayList<String>();
        if (address != null && address.length() > 0) {
            words.add(address);
        }
        if (city != null) {
            words.add(city.getName());
            words.add(city.getCountry().getName());
        }
        return StringUtils.collectionToDelimitedString(words, ", ");
    }
}
