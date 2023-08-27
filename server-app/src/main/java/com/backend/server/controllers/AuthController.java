package com.backend.server.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.server.controllers.requests.LoginRequestDto;
import com.backend.server.controllers.requests.RegisterRequestDto;
import com.backend.server.controllers.responses.ApiResponseDto;
import com.backend.server.controllers.utils.ControllerResponseUtils;
import com.backend.server.services.AuthService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<ApiResponseDto> register(@RequestBody RegisterRequestDto request) {
        return ControllerResponseUtils.authResponseFactory(
            () -> authService.register(request)
        );
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponseDto> login(@RequestBody LoginRequestDto request) {
        return ControllerResponseUtils.authResponseFactory(
            () -> authService.login(request)
        );
    }

    @PostMapping("/tokenLogin")
    public ResponseEntity<ApiResponseDto> tokenLogin(@RequestHeader(HttpHeaders.AUTHORIZATION) String token) {
        return ControllerResponseUtils.authResponseFactory(
            () -> authService.loginWithToken(token)
        );
    }
}
