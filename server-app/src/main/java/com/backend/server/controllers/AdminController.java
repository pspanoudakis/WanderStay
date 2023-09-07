package com.backend.server.controllers;

import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.backend.server.controllers.responses.ApiResponseDto;
import com.backend.server.controllers.utils.ControllerResponseUtils;
import com.backend.server.services.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/admin")
@PreAuthorize("hasAuthority('ADMIN')")
@RequiredArgsConstructor
public class AdminController {

    private final UserService userService;
    
    @GetMapping("/user/{username}")
    public ResponseEntity<ApiResponseDto> getUserProfile(
        @RequestHeader(HttpHeaders.AUTHORIZATION) String jwt,
        @PathVariable(required = false) String username
    ) {
        return ControllerResponseUtils.responseFactory(
            () -> userService.getUserProfile(jwt, username)
        );
    }

    @PostMapping("/user/{username}/setActive")
    public ResponseEntity<ApiResponseDto> setUserIsActive(
        @RequestHeader(HttpHeaders.AUTHORIZATION) String jwt,
        @PathVariable(required = false) String username,
        @RequestParam Boolean isActive
    ) {
        return ControllerResponseUtils.responseFactory(
            () -> userService.setUserIsActive(jwt, username, isActive)
        );
    }

    @GetMapping("/searchUsers")
    public ResponseEntity<?> searchUsers(
        @RequestHeader(HttpHeaders.AUTHORIZATION) String jwt,
        @RequestParam(required = false) String usernamePattern,
        @RequestParam(required = false) Boolean isActive,
        @RequestParam Short numPage, @RequestParam Byte pageSize
    ) {
        return ControllerResponseUtils.genericResponseFactory(
            () -> userService.searchUsers(
                jwt, 
                usernamePattern, isActive,
                numPage, pageSize
            )
        );
    }
}
