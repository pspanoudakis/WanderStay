package com.backend.server.controllers;

import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.server.controllers.requests.PropertySearchRequestDto;
import com.backend.server.controllers.utils.PageableRetriever;
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
    public ResponseEntity<Page<Long>> searchProperties(@RequestBody PropertySearchRequestDto searchRequest) {

        Page<Property> results = propertyRepository.findAll(
            filtersSpecification.getPropertyFiltersSpecification(searchRequest.getFiltersInfo()),
            PageableRetriever.getPageable(searchRequest.getPaginationInfo())
        );

        return ResponseEntity.ok(
            results.map(p -> p.getId())
        );
    }
}
