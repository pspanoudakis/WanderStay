package com.backend.server.services;

import org.springframework.stereotype.Service;

import com.backend.server.controllers.requests.UpdatedUserDetailsDto;
import com.backend.server.controllers.responses.UserResponseDto;
import com.backend.server.entities.users.User;
import com.backend.server.exceptions.BadRequestException;
import com.backend.server.repositories.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {

    private final AuthService authService;
    private final RoleService roleService;
    private final UserRepository userRepository;

    public UserResponseDto updateUserDetails(
        String jwt, UpdatedUserDetailsDto request
    ) throws BadRequestException {
        User user = authService.getUserFromTokenOrElseThrow(jwt);

        user.setEmail(request.getEmail());
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setMobileNumber(request.getMobileNumber());

        user.getRoles().clear();
        user.setRoles(roleService.getRequiredRoles(request.getRoles()));

        return new UserResponseDto(userRepository.save(user));
    }
}
