package com.backend.server.controllers.responses;

import lombok.Getter;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@SuperBuilder
public class PropertyHostSidePreviewDto extends PropertyBasicInfoDto{
    private Long imgId;
    private String location;
}
