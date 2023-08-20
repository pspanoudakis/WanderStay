package com.backend.server.controllers.responses;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LocationResponseDto extends ApiResponseDto {

    private List<?> locations;

    public LocationResponseDto(List<?> locations) {
        super(true);
        this.locations = List.copyOf(locations);
    }

}
