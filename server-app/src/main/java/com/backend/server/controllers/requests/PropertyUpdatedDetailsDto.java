package com.backend.server.controllers.requests;

import java.util.List;

import com.backend.server.entities.properties.AvailableTimeSlot;
import com.backend.server.entities.properties.PropertyAmenities;
import com.backend.server.entities.properties.PropertyRules;
import com.backend.server.entities.properties.PropertyType;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PropertyUpdatedDetailsDto {
    private String title;
    private PropertyType propertyType;
    private String description;
    private List<PendingImageDto> pendingImages;
    private List<AvailableTimeSlot> availableSlots;
    private PropertyAmenities amenities;
    private PropertyRules rules;
    private Short spaceArea;
    private Long cityId;
    private String address;
    private Double latitude;
    private Double longitude;
}
