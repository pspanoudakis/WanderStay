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
import com.backend.server.controllers.responses.AuthResponseDto;
import com.backend.server.entities.users.Guest;
import com.backend.server.entities.users.Host;
import com.backend.server.entities.users.RoleEntityId;
import com.backend.server.entities.users.RoleType;
import com.backend.server.entities.users.User;
import com.backend.server.exceptions.BadRequestException;
import com.backend.server.repositories.GuestRepository;
import com.backend.server.repositories.HostRepository;
import com.backend.server.repositories.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final GuestRepository guestRepository;
    private final HostRepository hostRepository;
    private final RoleService roleService;
    private final JwtService jwtService;
    private final AuthenticationManager authManager;
    private final PasswordEncoder passwordEncoder;

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
        User user = (
            userRepository.findByUsername(
                jwtService.findUsername(token)
            ).orElseThrow(
                () -> new BadRequestException(
                        "The provided JWT is not associated with a User, is Invalid or has Expired."
                    )
            )
        );
        if (user.isLocked()) {
            throw new BadRequestException(
                "The user associated with the specified JWT is locked."
            );
        }
        return user;
    }
    
    public AuthResponseDto register(RegisterRequestDto request) throws BadRequestException {
        if (userRepository.findByUsername(request.getUsername()).isPresent()) {
            throw new BadRequestException(
                "Username '" + request.getUsername() + "' already exists."
            );
        }
        if (request.getRoles().contains(RoleType.ADMIN.toString())) {
            throw new BadRequestException(
                "Cannot register user with role '" + RoleType.ADMIN.toString() + "'"
            );
        }
        boolean isHost = request.getRoles().contains(RoleType.HOST.toString());
        User user = User.builder()
            .username(request.getUsername())
            .firstName(request.getFirstName())
            .lastName(request.getLastName())
            .email(request.getEmail())
            .mobileNumber(request.getMobileNumber())
            .password(passwordEncoder.encode(request.getPassword()))
            .roles(roleService.getRequestedRoles(request.getRoles()))
            .isActive(!isHost)
            .build();
        userRepository.save(user);

        if (request.getRoles().contains(RoleType.GUEST.toString())) {
            guestRepository.save(
                Guest.builder()
                    .user(user)
                    .id(new RoleEntityId())
                    .build()
            );
        }
        if (isHost) {
            hostRepository.save(
                Host.builder()
                    .user(user)
                    .id(new RoleEntityId())
                    .build()
            );
        }

        return createAuthResponse(user);
    }

    public AuthResponseDto login(LoginRequestDto request) throws NoSuchElementException{
        try {
            authManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                    request.getUsername(),
                    request.getPassword()
                )
            );            
        } catch (AuthenticationException e) {
            throw new BadRequestException(e.getMessage());
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

    public AuthResponseDto loginWithToken(String token) throws BadRequestException {
        return createAuthResponse(
            getUserFromTokenOrElseThrow(token),
            token
        );
    }
}
