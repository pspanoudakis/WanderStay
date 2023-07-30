package com.backend.server.services;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.backend.server.config.jwt.JwtService;
import com.backend.server.controllers.requests.LoginRequest;
import com.backend.server.controllers.requests.RegisterRequest;
import com.backend.server.controllers.responses.AuthResponse;
import com.backend.server.controllers.utils.ApiErrorResponse;
import com.backend.server.controllers.utils.ApiResponse;
import com.backend.server.controllers.utils.ServiceUtils;
import com.backend.server.entities.users.User;
import com.backend.server.repositories.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final RoleService roleService;
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
    
    public ApiResponse register(RegisterRequest request) {
        if (userRepository.findByUsername(request.getUsername()).isPresent()) {
            return new ApiErrorResponse(
                "Username '" + request.getUsername() + "' already exists"
            );
        }
        User user = User.builder()
            .username(request.getUsername())
            .email(request.getEmail())
            .password(passwordEncoder.encode(request.getPassword()))
            .roles(List.of(roleService.getGuestRole()))
            .build();
        userRepository.save(user);
        return createResponse(user);
    }

    public ApiResponse login(LoginRequest request) throws NoSuchElementException{
        // if (request.getUsername().equals("pablo")) {
        //     throw new Exception("Oops");
        // }
        try {
            authManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                    request.getUsername(),
                    request.getPassword()
                )
            );            
        } catch (AuthenticationException e) {
            return ServiceUtils.createErrorResponse(e);
        }
        // We know the user is authenticated by now
        User user = userRepository.findByUsername(request.getUsername())
            .orElseThrow();
        return createResponse(user);
    }
}
