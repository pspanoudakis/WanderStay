package com.backend.server.controllers.responses;

import java.util.List;

import com.backend.server.controllers.utils.ApiResponse;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LocationResponse extends ApiResponse {

    private List<?> locations;

    public LocationResponse(List<?> locations) {
        super(true);
        this.locations = List.copyOf(locations);
    }

}
