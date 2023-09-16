package com.backend.server.controllers.responses;

import java.util.List;

import com.backend.server.entities.images.Image;
import com.backend.server.entities.locations.City;
import com.backend.server.entities.locations.Country;
import com.backend.server.entities.properties.AvailableTimeSlot;
import com.backend.server.entities.properties.PropertyAmenities;
import com.backend.server.entities.properties.PropertyRules;
import com.backend.server.entities.properties.PublicTransportAccesses;

import lombok.Getter;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@SuperBuilder
public class PropertyDetailsDto extends PropertyBasicInfoDto {
    private String hostName;
    private List<Image> images;
    private List<AvailableTimeSlot> availableSlots;
    private PropertyAmenities amenities;
    private PropertyRules rules;
    private PublicTransportAccesses transport;
    private Short spaceArea;
    private String address;
    private City city;
    private Country country;
    private Double latitude;
    private Double longitude; 
}
