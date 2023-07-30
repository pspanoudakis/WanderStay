package com.backend.server.services;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.backend.server.controllers.responses.LocationResponse;
import com.backend.server.controllers.utils.ApiErrorResponse;
import com.backend.server.controllers.utils.ApiResponse;
import com.backend.server.entities.locations.Country;
import com.backend.server.repositories.CityRepository;
import com.backend.server.repositories.CountryRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LocationService {
    private final CountryRepository countryRepository;
    private final CityRepository cityRepository;

    public ApiResponse getAllCountries() {
        return new LocationResponse(countryRepository.findAllByOrderByNameAsc());
    }

    public ApiResponse getCitiesByCountryId(Long countryId) {
        Optional<Country> country = countryRepository.findById(countryId);
        
        if (country.isPresent()) {
            return new LocationResponse(
                cityRepository.findByCountryOrderByNameAsc(country.get())
            );
        } else {
            return new ApiErrorResponse("Unknown Country ID: " + countryId.toString());
        }
    }
}
