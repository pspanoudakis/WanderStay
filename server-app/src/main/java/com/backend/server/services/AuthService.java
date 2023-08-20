package com.backend.server.services;

import java.util.NoSuchElementException;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.backend.server.config.jwt.JwtService;
import com.backend.server.controllers.requests.LoginRequestDto;
import com.backend.server.controllers.requests.RegisterRequestDto;
import com.backend.server.controllers.responses.ApiErrorResponseDto;
import com.backend.server.controllers.responses.ApiResponseDto;
import com.backend.server.controllers.responses.AuthResponseDto;
import com.backend.server.entities.users.RoleType;
import com.backend.server.entities.users.User;
import com.backend.server.exceptions.BadRequestException;
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

    private AuthResponseDto buildAuthResponse(User user, String jwt) {
        return AuthResponseDto.builder()
            .user(user)
            .jwt(jwt)
            .build();
    }

    private AuthResponseDto createAuthResponse(User user) {
        String jwt = jwtService.generateJwt(user);
        return buildAuthResponse(user, jwt);
    }

    private AuthResponseDto createAuthResponse(User user, String jwt) {
        return buildAuthResponse(user, jwtService.cleanUpJwt(jwt));
    }

    public User getUserFromTokenOrElseThrow(String token) throws BadRequestException{
        return userRepository.findByUsername(
            jwtService.findUsername(token)
        ).orElseThrow(
            () -> new BadRequestException(
                    "The provided JWT is not associated with a User, is Invalid or has Expired."
                )
        );
    }
    
    public ApiResponseDto register(RegisterRequestDto request) {
        if (userRepository.findByUsername(request.getUsername()).isPresent()) {
            return new ApiErrorResponseDto(
                "Username '" + request.getUsername() + "' already exists."
            );
        }
        if (request.getRoles().contains(RoleType.ADMIN.toString())) {
            return new ApiErrorResponseDto(
                "Cannot register user with role '" + RoleType.ADMIN.toString() + "'"
            );
        }
        boolean isHost = request.getRoles().contains(RoleType.HOST.toString());
        User user = User.builder()
            .username(request.getUsername())
            .email(request.getEmail())
            .mobileNumber(request.getMobileNumber())
            .password(passwordEncoder.encode(request.getPassword()))
            .roles(roleService.getRequiredRoles(request.getRoles()))
            .isActive(/* true */!isHost)
            .build();
        userRepository.save(user);
        return createAuthResponse(user);
    }

    public ApiResponseDto login(LoginRequestDto request) throws NoSuchElementException{
        try {
            authManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                    request.getUsername(),
                    request.getPassword()
                )
            );            
        } catch (AuthenticationException e) {
            return new ApiErrorResponseDto(e);
        }
        // We know the user is authenticated by now
        User user = userRepository.findByUsername(
            request.getUsername()
        ).orElseThrow(
            () -> new Error(
                "User '" +  request.getUsername() + "' " +
                "was successfully authenticated, but was not found in DB."
            )
        );
        return createAuthResponse(user);
    }

    public ApiResponseDto loginWithToken(String token) throws BadRequestException {
        return createAuthResponse(
            getUserFromTokenOrElseThrow(token),
            token
        );
    }
}
