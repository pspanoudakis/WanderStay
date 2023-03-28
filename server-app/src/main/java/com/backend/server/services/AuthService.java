package com.backend.server.services;


import com.backend.server.entities.user.Role;
import com.backend.server.entities.user.User;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.backend.server.config.jwt.JwtService;
import com.backend.server.controllers.requests.LoginRequest;
import com.backend.server.controllers.requests.RegisterRequest;
import com.backend.server.controllers.responses.AuthResponse;
import com.backend.server.repositories.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authManager;

    private AuthResponse createResponse(User user) {
        String jwt = jwtService.generateJwt(user);
        return AuthResponse.builder()
            .user(user)
            .jwt(jwt)
            .build();
    }
    
    public AuthResponse register(RegisterRequest request) {
        User user = User.builder()
            .username(request.getUsername())
            .email(request.getEmail())
            .password(passwordEncoder.encode(request.getPassword()))
            .role(Role.VISITOR)
            .build();
        userRepository.save(user);
        return createResponse(user);
    }

    public AuthResponse login(LoginRequest request) {
        authManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                request.getUsername(),
                request.getPassword()
            )
        );
        // We know the user is authenticated by now
        User user = userRepository.findByUsername(request.getUsername())
            .orElseThrow();
        return createResponse(user);
    }

}
