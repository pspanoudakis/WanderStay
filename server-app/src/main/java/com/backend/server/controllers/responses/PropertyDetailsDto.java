package com.backend.server.controllers.responses;

import java.util.List;

import com.backend.server.entities.images.Image;
import com.backend.server.entities.properties.AvailableTimeSlot;
import com.backend.server.entities.properties.PropertyAmenities;
import com.backend.server.entities.properties.PropertyRules;

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
    private Short spaceArea;
    private String address;
    private String cityName;
    private String countryName;
    private Double latitude;
    private Double longitude;
}
