package com.backend.server.services;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.backend.server.controllers.responses.ApiErrorResponseDto;
import com.backend.server.controllers.responses.ApiResponseDto;
import com.backend.server.controllers.responses.LocationResponseDto;
import com.backend.server.entities.locations.Country;
import com.backend.server.repositories.CityRepository;
import com.backend.server.repositories.CountryRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LocationService {
    private final CountryRepository countryRepository;
    private final CityRepository cityRepository;

    public ApiResponseDto getAllCountries() {
        return new LocationResponseDto(countryRepository.findAllByOrderByNameAsc());
    }

    public ApiResponseDto getCitiesByCountryId(Long countryId) {
        Optional<Country> country = countryRepository.findById(countryId);
        
        if (country.isPresent()) {
            return new LocationResponseDto(
                cityRepository.findByCountryOrderByNameAsc(country.get())
            );
        } else {
            return new ApiErrorResponseDto("Unknown Country ID: " + countryId.toString());
        }
    }
}
