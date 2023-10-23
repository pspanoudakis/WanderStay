package com.backend.server.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.backend.server.controllers.requests.PropertyReservationRequestDto;
import com.backend.server.controllers.requests.PropertyReviewRequestDto;
import com.backend.server.controllers.requests.PropertySearchRequestDto;
import com.backend.server.controllers.requests.PropertyUpdatedDetailsDto;
import com.backend.server.controllers.responses.ApiResponseDto;
import com.backend.server.controllers.utils.ControllerResponseUtils;
import com.backend.server.entities.users.User;
import com.backend.server.services.PropertyService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/property")
@RequiredArgsConstructor
public class PropertyController {

    private final PropertyService propertyService;
    
    @PostMapping("/search")
    public ResponseEntity<?> searchProperties(
        @RequestBody PropertySearchRequestDto searchRequest
    ) {
        return ControllerResponseUtils.genericResponseFactory(
            () -> propertyService.searchProperties(searchRequest)
        );
    }

    @GetMapping("/{propertyId}")
    public ResponseEntity<ApiResponseDto> getPropertyDetails(
        @PathVariable Long propertyId
    ) {
        return ControllerResponseUtils.responseFactory(
            () -> propertyService.getPropertyDetails(propertyId)
        );
    }

    @PostMapping({"/{propertyId}", "/"})
    public ResponseEntity<ApiResponseDto> createOrUpdateProperty(
        @AuthenticationPrincipal User thisUser,
        @PathVariable(required = false) Long propertyId,
        @RequestBody PropertyUpdatedDetailsDto request
    ) {
        return ControllerResponseUtils.responseFactory(
            () -> propertyService.createOrUpdateProperty(propertyId, thisUser, request)
        );
    }

    @PostMapping("/{propertyId}/reserve")
    public ResponseEntity<ApiResponseDto> makePropertyReservation(
        @AuthenticationPrincipal User thisGuestUser,
        @PathVariable Long propertyId,
        @RequestBody PropertyReservationRequestDto request
    ) {
        return ControllerResponseUtils.responseFactory(
            () -> propertyService.makePropertyReservation(propertyId, thisGuestUser, request)
        );
    }

    @PostMapping("/{propertyId}/review")
    public ResponseEntity<ApiResponseDto> reviewProperty(
        @AuthenticationPrincipal User thisGuestUser,
        @PathVariable Long propertyId,
        @RequestBody PropertyReviewRequestDto request
    ) {
        return ControllerResponseUtils.responseFactory(
            () -> propertyService.createOrUpdatePropertyReview(propertyId, thisGuestUser, request)
        );
    }

    @PostMapping({"/{propertyId}/uploadImage", "/uploadImage"})
    public ResponseEntity<?> addPropertyImage(
        @AuthenticationPrincipal User thisUser,
        @PathVariable(required = false) Long propertyId,
        @RequestParam("img") MultipartFile img,
        @RequestParam(name = "isMain", defaultValue = "false") String isMainStr
    ) {
        return ControllerResponseUtils.genericResponseFactory(
            () -> propertyService.addPropertyImage(
                    propertyId,
                    thisUser,
                    img,
                    Boolean.parseBoolean(isMainStr)
                )
        );        
    }
    
    @GetMapping("/{propertyId}/reviews")
    public ResponseEntity<?> getPropertyReviews(
        @PathVariable Long propertyId,
        @RequestParam Short numPage,
        @RequestParam Byte pageSize
    ) {
        return ControllerResponseUtils.genericResponseFactory(
            () -> propertyService.getPropertyReviews(propertyId, numPage, pageSize)
        );
    }
    
}
