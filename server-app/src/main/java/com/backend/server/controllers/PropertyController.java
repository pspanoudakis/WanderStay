package com.backend.server.controllers;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.server.controllers.requests.PropertyFiltersCriteriaDto;
import com.backend.server.entities.properties.Property;
import com.backend.server.repositories.PropertyRepository;
import com.backend.server.specifications.PropertyFiltersSpecification;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/property")
@RequiredArgsConstructor
public class PropertyController {

    private final PropertyFiltersSpecification filtersSpecification;
    private final PropertyRepository propertyRepository;
    
    @PostMapping("/search")
    public ResponseEntity<List<Long>> searchProperties(@RequestBody PropertyFiltersCriteriaDto searchFilters) {

        List<Property> results = propertyRepository.findAll(
            filtersSpecification.getPropertyFiltersSpecification(searchFilters)
        );

        return ResponseEntity.ok(
            results.stream().map(p -> p.getId()).collect(Collectors.toList())
        );
    }
}
