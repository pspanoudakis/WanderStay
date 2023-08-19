package com.backend.server.controllers;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.server.controllers.requests.PropertyReservationRequest;
import com.backend.server.controllers.requests.PropertySearchRequestDto;
import com.backend.server.controllers.utils.ApiResponse;
import com.backend.server.controllers.utils.ControllerUtils;
import com.backend.server.services.PropertyService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/property")
@RequiredArgsConstructor
public class PropertyController {

    private final PropertyService propertyService;
    
    @PostMapping("/search")
    public ResponseEntity<Page<Long>> searchProperties(
        @RequestBody PropertySearchRequestDto searchRequest
    ) {

        return ResponseEntity.ok(
            propertyService.searchProperties(searchRequest)
        );
    }

    @PreAuthorize("hasAuthority('GUEST')")
    @PostMapping("/{propertyId}/reserve")
    public ResponseEntity<ApiResponse> makePropertyReservation(
        @RequestHeader(HttpHeaders.AUTHORIZATION) String jwt,
        @PathVariable Long propertyId,
        @RequestBody PropertyReservationRequest request
    ) {
        return ControllerUtils.responseFactory(
            () -> propertyService.makePropertyReservation(propertyId, jwt, request)
        );
    }
}
