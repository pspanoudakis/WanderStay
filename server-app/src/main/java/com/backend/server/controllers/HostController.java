package com.backend.server.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.backend.server.controllers.responses.ApiResponseDto;
import com.backend.server.controllers.utils.ControllerResponseUtils;
import com.backend.server.entities.users.User;
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
        @AuthenticationPrincipal User thisUser,
        @PathVariable Long propertyId
    ) {
        return ControllerResponseUtils.responseFactory(
            () -> propertyService.getOwnedPropertyDetails(thisUser, propertyId)
        );
    }
    
    @GetMapping("/properties")
    public ResponseEntity<?> getHostProperties(
        @AuthenticationPrincipal User thisUser,
        @RequestParam Short numPage, @RequestParam Byte pageSize
    ) {
        return ControllerResponseUtils.genericResponseFactory(
            () -> propertyService.getHostProperties(thisUser, numPage, pageSize)
        );
    }
    
    @GetMapping("/upcomingReservations")
    public ResponseEntity<?> getUpcomingHostReservations(
        @AuthenticationPrincipal User thisUser,
        @RequestParam Short numPage, @RequestParam Byte pageSize
    ) {
        return ControllerResponseUtils.genericResponseFactory(
            () -> hostService.getUpcomingHostReservations(thisUser, numPage, pageSize)
        );
    }
    
    @GetMapping("/reservations")
    public ResponseEntity<?> getHostReservations(
        @AuthenticationPrincipal User thisUser,
        @RequestParam Short numPage, @RequestParam Byte pageSize
    ) {
        return ControllerResponseUtils.genericResponseFactory(
            () -> hostService.getHostReservations(thisUser, numPage, pageSize)
        );
    }

}
