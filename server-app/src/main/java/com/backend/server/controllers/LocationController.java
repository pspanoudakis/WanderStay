package com.backend.server.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.server.controllers.responses.ApiResponseDto;
import com.backend.server.controllers.utils.ControllerResponseUtils;
import com.backend.server.services.LocationService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/location")
@RequiredArgsConstructor
public class LocationController {

    private final LocationService locationService;
    
    @GetMapping("/countries")
    public ResponseEntity<ApiResponseDto> getAllCountries() {
        return ControllerResponseUtils.responseFactory(
            locationService.getAllCountries()
        );
    }

    @GetMapping("/countries/{countryId}")
    public ResponseEntity<ApiResponseDto> getCitiesByCountryId(@PathVariable Long countryId) {
        return ControllerResponseUtils.responseFactory(
            locationService.getCitiesByCountryId(countryId)
        );
    }
}
