package com.backend.server.services;

import java.util.NoSuchElementException;
import java.util.Optional;

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
import com.backend.server.entities.users.RoleType;
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

    private AuthResponse buildAuthResponse(User user, String jwt) {
        return AuthResponse.builder()
            .user(user)
            .jwt(jwt)
            .build();
    }

    private AuthResponse createAuthResponse(User user) {
        String jwt = jwtService.generateJwt(user);
        return buildAuthResponse(user, jwt);
    }

    private AuthResponse createAuthResponse(User user, String jwt) {
        return buildAuthResponse(user, jwt);
    }
    
    public ApiResponse register(RegisterRequest request) {
        if (userRepository.findByUsername(request.getUsername()).isPresent()) {
            return new ApiErrorResponse(
                "Username '" + request.getUsername() + "' already exists."
            );
        }
        if (request.getRoles().contains(RoleType.ADMIN.toString())) {
            return new ApiErrorResponse(
                "Cannot register user with role '" + RoleType.ADMIN.toString() + "'"
            );
        }
        boolean isHost = !request.getRoles().contains(RoleType.HOST.toString());
        User user = User.builder()
            .username(request.getUsername())
            .email(request.getEmail())
            .mobileNumber(request.getMobileNumber())
            .password(passwordEncoder.encode(request.getPassword()))
            .roles(roleService.getRequiredRoles(request.getRoles()))
            .isActive(isHost)
            .build();
        userRepository.save(user);
        return createAuthResponse(user);
    }

    public ApiResponse login(LoginRequest request) throws NoSuchElementException{
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
        User user = userRepository.findByUsername(
            request.getUsername()
        ).orElseThrow();
        return createAuthResponse(user);
    }

    public ApiResponse loginWithToken(String token) {
        Optional<User> user = userRepository.findByUsername(
            jwtService.findUsername(token)
        );
        if (user.isPresent()) {
            return createAuthResponse(user.get(), token);
        }
        return new ApiErrorResponse("The provided JWT is invalid.");
    }
}
