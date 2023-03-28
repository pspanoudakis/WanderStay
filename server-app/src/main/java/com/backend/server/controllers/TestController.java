package com.backend.server.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.backend.server.controllers.requests.LoginRequest;
import com.backend.server.controllers.requests.RegisterRequest;
import com.backend.server.controllers.responses.AuthResponse;
import com.backend.server.services.AuthService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/test")
@RequiredArgsConstructor
public class TestController {

    private final AuthService authService;
    
    @GetMapping("/hello")
    public ResponseEntity<String> helloNum(@RequestParam(value = "num", defaultValue = "0") String num) {
        return ResponseEntity.ok("*Hello " + num + "*");
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request) {
        return ResponseEntity.ok(authService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }
    
}
