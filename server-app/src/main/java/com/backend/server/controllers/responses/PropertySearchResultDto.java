package com.backend.server.controllers.responses;

import lombok.Getter;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@SuperBuilder
public class PropertySearchResultDto extends PropertyBasicInfoDto {
    private Long imgId;
    private Byte numBeds;
    private Integer pricePerNight;
    private Integer totalPrice;
}
