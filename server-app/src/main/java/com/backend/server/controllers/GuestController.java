package com.backend.server.controllers;

import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.backend.server.controllers.utils.ControllerResponseUtils;
import com.backend.server.services.GuestService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/guest")
@PreAuthorize("hasAuthority('GUEST')")
@RequiredArgsConstructor
public class GuestController {

    private final GuestService guestService;
    
    @GetMapping("/reservations")
    public ResponseEntity<?> getGuestReservations(
        @RequestHeader(HttpHeaders.AUTHORIZATION) String jwt,
        @RequestParam Short numPage, @RequestParam Byte pageSize
    ) {
        return ControllerResponseUtils.genericResponseFactory(
            () -> guestService.getGuestReservations(jwt, numPage, pageSize)
        );
    }

}
