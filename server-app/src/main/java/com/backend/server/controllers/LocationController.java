package com.backend.server.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.server.controllers.utils.ApiResponse;
import com.backend.server.controllers.utils.ControllerUtils;
import com.backend.server.services.LocationService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/location")
@RequiredArgsConstructor
public class LocationController {

    private final LocationService locationService;
    
    @GetMapping("/countries")
    public ResponseEntity<ApiResponse> getAllCountries() {
        return ControllerUtils.responseFactory(
            locationService.getAllCountries()
        );
    }

    @GetMapping("/countries/{countryId}")
    public ResponseEntity<ApiResponse> getCitiesByCountryId(@PathVariable Long countryId) {
        return ControllerUtils.responseFactory(
            locationService.getCitiesByCountryId(countryId)
        );
    }
}
