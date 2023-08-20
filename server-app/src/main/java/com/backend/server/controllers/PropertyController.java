package com.backend.server.controllers;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
// import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.backend.server.controllers.requests.PropertyReservationRequestDto;
import com.backend.server.controllers.requests.PropertyReviewRequestDto;
import com.backend.server.controllers.requests.PropertySearchRequestDto;
import com.backend.server.controllers.responses.ApiResponseDto;
import com.backend.server.controllers.utils.ControllerUtils;
import com.backend.server.exceptions.BadRequestException;
import com.backend.server.pojos.PropertyReviewsSummary;
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

    // @PreAuthorize("hasAuthority('GUEST')")
    @PostMapping("/{propertyId}/reserve")
    public ResponseEntity<ApiResponseDto> makePropertyReservation(
        @RequestHeader(HttpHeaders.AUTHORIZATION) String jwt,
        @PathVariable Long propertyId,
        @RequestBody PropertyReservationRequestDto request
    ) {
        return ControllerUtils.responseFactory(
            () -> propertyService.makePropertyReservation(propertyId, jwt, request)
        );
    }

    // @PreAuthorize("hasAuthority('GUEST')")
    @PostMapping("/{propertyId}/review")
    public ResponseEntity<ApiResponseDto> reviewProperty(
        @RequestHeader(HttpHeaders.AUTHORIZATION) String jwt,
        @PathVariable Long propertyId,
        @RequestBody PropertyReviewRequestDto request
    ) {
        return ControllerUtils.responseFactory(
            () -> propertyService.createOrUpdatePropertyReview(propertyId, jwt, request)
        );
    }
    
    @GetMapping("/{propertyId}/reviews")
    public ResponseEntity<?> getPropertyReviews(
        @PathVariable Long propertyId,
        @RequestParam Short numPage,
        @RequestParam Byte pageSize
    ) {
        try {
            return ResponseEntity.ok(
                propertyService.getPropertyReviews(propertyId, numPage, pageSize)
            );
        } catch (BadRequestException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
        
    }

    // TODO: delete this
    @GetMapping("/{propertyId}/reviewsSummary")
    public ResponseEntity<PropertyReviewsSummary> getPropertyReviewsSummary(
        @PathVariable Long propertyId
    ) {
        return ResponseEntity.ok(propertyService.getPropertyReviewsSummary(propertyId));
    }
}
