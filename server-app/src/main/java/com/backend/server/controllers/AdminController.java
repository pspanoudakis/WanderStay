package com.backend.server.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.backend.server.controllers.responses.ApiResponseDto;
import com.backend.server.controllers.utils.ControllerResponseUtils;
import com.backend.server.entities.users.User;
import com.backend.server.services.GuestService;
import com.backend.server.services.HostService;
import com.backend.server.services.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AdminController {

    private final UserService userService;
    private final GuestService guestService;
    private final HostService hostService;
    
    @GetMapping("/user/{targetUsername}")
    public ResponseEntity<ApiResponseDto> getUserProfile(
        @AuthenticationPrincipal User thisUser,
        @PathVariable(required = false) String targetUsername
    ) {
        return ControllerResponseUtils.responseFactory(
            () -> userService.getUserProfile(thisUser, targetUsername)
        );
    }

    @PostMapping("/user/{targetUsername}/setActive")
    public ResponseEntity<ApiResponseDto> setUserIsActive(
        @AuthenticationPrincipal User thisUser,
        @PathVariable(required = false) String targetUsername,
        @RequestParam Boolean isActive
    ) {
        return ControllerResponseUtils.responseFactory(
            () -> userService.setUserIsActive(thisUser, targetUsername, isActive)
        );
    }

    @GetMapping("/guest/{targetUsername}/reviews")
    public ResponseEntity<?> getAllGuestReviews(
        @AuthenticationPrincipal User thisUser,
        @PathVariable(required = false) String targetUsername
    ) {
        return ControllerResponseUtils.genericResponseFactory(
            () -> guestService.getAllGuestReviews(thisUser, targetUsername)
        );
    }

    @GetMapping("/guest/{targetUsername}/reservations")
    public ResponseEntity<?> getAllGuestReservations(
        @AuthenticationPrincipal User thisUser,
        @PathVariable(required = false) String targetUsername
    ) {
        return ControllerResponseUtils.genericResponseFactory(
            () -> guestService.getAllGuestReservations(thisUser, targetUsername)
        );
    }

    @GetMapping("/host/{targetUsername}/properties")
    public ResponseEntity<?> getAllHostProperties(
        @AuthenticationPrincipal User thisUser,
        @PathVariable(required = false) String targetUsername
    ) {
        return ControllerResponseUtils.genericResponseFactory(
            () -> hostService.getAllHostProperties(thisUser, targetUsername)
        );
    }

    @GetMapping("/host/{targetUsername}/reviews")
    public ResponseEntity<?> getAllHostReviews(
        @AuthenticationPrincipal User thisUser,
        @PathVariable(required = false) String targetUsername
    ) {
        return ControllerResponseUtils.genericResponseFactory(
            () -> hostService.getAllHostReviews(thisUser, targetUsername)
        );
    }

    @GetMapping("/searchUsers")
    public ResponseEntity<?> searchUsers(
        @AuthenticationPrincipal User thisUser,
        @RequestParam(required = false) String usernamePattern,
        @RequestParam(required = false) Boolean isActive,
        @RequestParam Short numPage, @RequestParam Byte pageSize
    ) {
        return ControllerResponseUtils.genericResponseFactory(
            () -> userService.searchUsers(
                thisUser, 
                usernamePattern, isActive,
                numPage, pageSize
            )
        );
    }
}
