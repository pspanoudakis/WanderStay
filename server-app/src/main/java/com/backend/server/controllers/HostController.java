package com.backend.server.controllers;

import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.backend.server.controllers.responses.ApiResponseDto;
import com.backend.server.controllers.utils.ControllerResponseUtils;
import com.backend.server.services.HostService;
import com.backend.server.services.PropertyService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/host")
@PreAuthorize("hasAuthority('HOST')")
@RequiredArgsConstructor
public class HostController {

    private final HostService hostService;
    private final PropertyService propertyService;

    @GetMapping("/property/{propertyId}")
    public ResponseEntity<ApiResponseDto> getOwnedPropertyDetails(
        @RequestHeader(HttpHeaders.AUTHORIZATION) String jwt,
        @PathVariable Long propertyId
    ) {
        return ControllerResponseUtils.responseFactory(
            () -> propertyService.getOwnedPropertyDetails(jwt, propertyId)
        );
    }
    
    @GetMapping("/properties")
    public ResponseEntity<?> getHostProperties(
        @RequestHeader(HttpHeaders.AUTHORIZATION) String jwt,
        @RequestParam Short numPage, @RequestParam Byte pageSize
    ) {
        return ControllerResponseUtils.genericResponseFactory(
            () -> propertyService.getHostProperties(jwt, numPage, pageSize)
        );
    }
    
    @GetMapping("/upcomingReservations")
    public ResponseEntity<?> getUpcomingHostReservations(
        @RequestHeader(HttpHeaders.AUTHORIZATION) String jwt,
        @RequestParam Short numPage, @RequestParam Byte pageSize
    ) {
        return ControllerResponseUtils.genericResponseFactory(
            () -> hostService.getUpcomingHostReservations(jwt, numPage, pageSize)
        );
    }
    
    @GetMapping("/reservations")
    public ResponseEntity<?> getHostReservations(
        @RequestHeader(HttpHeaders.AUTHORIZATION) String jwt,
        @RequestParam Short numPage, @RequestParam Byte pageSize
    ) {
        return ControllerResponseUtils.genericResponseFactory(
            () -> hostService.getHostReservations(jwt, numPage, pageSize)
        );
    }

}
