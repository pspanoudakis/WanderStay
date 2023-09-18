package com.backend.server.controllers;

import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.backend.server.controllers.requests.UpdatedUserDetailsDto;
import com.backend.server.controllers.responses.ApiResponseDto;
import com.backend.server.controllers.utils.ControllerResponseUtils;
import com.backend.server.entities.users.User;
import com.backend.server.services.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/editProfile")
    public ResponseEntity<ApiResponseDto> updateUserDetails(
        @RequestHeader(HttpHeaders.AUTHORIZATION) String jwt,
        @RequestBody UpdatedUserDetailsDto request
    ) {
        return ControllerResponseUtils.responseFactory(
            () -> userService.updateUserDetails(jwt, request)
        );
    }

    @PostMapping("/uploadImage")
    public ResponseEntity<?> uploadUserImage(
        @AuthenticationPrincipal User thisUser,
        @RequestParam("img") MultipartFile img
    ) {
        return ControllerResponseUtils.genericResponseFactory(
            () -> userService.uploadUserImage(thisUser, img)
        );
    }
}
