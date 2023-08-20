package com.backend.server.controllers.responses;

import com.backend.server.pojos.PropertyReviewsSummary;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class PropertySearchResultDto {
    private Long propertyId;
    private String title;
    private String description;
    private Long imgId;
    private Byte numBeds;
    private PropertyReviewsSummary reviewsSummary;
    private Integer pricePerNight;
    private Integer totalPrice;
}
