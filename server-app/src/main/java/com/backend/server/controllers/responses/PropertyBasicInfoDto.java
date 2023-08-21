package com.backend.server.controllers.responses;

import com.backend.server.entities.properties.PropertyType;
import com.backend.server.pojos.PropertyReviewsSummary;

import lombok.Getter;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@SuperBuilder
public class PropertyBasicInfoDto {
    private Long propertyId;
    private PropertyType propertyType;
    private String title;
    private String description;
    private PropertyReviewsSummary reviewsSummary;
}
