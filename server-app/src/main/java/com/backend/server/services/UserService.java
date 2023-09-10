package com.backend.server.services;

import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import com.backend.server.controllers.requests.UpdatedUserDetailsDto;
import com.backend.server.controllers.responses.UserResponseDto;
import com.backend.server.controllers.responses.UserSearchResultDto;
import com.backend.server.entities.users.User;
import com.backend.server.exceptions.BadRequestException;
import com.backend.server.repositories.UserRepository;
import com.backend.server.services.utils.PageableRetriever;
import com.backend.server.specifications.UserSpecification;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {

    private final AdminService adminService;
    private final AuthService authService;
    private final RoleService roleService;
    private final UserSpecification userSpecification;
    private final UserRepository userRepository;

    public User getUserByUsernameOrElseThrow(String username) throws BadRequestException {
        return userRepository.findByUsername(username).orElseThrow(
            () -> new BadRequestException("User '" + username + "' does not exist.")
        );
    }

    public UserResponseDto updateUserDetails(
        String jwt, UpdatedUserDetailsDto request
    ) throws BadRequestException {
        User user = authService.getUserFromTokenOrElseThrow(jwt);

        user.setEmail(request.getEmail());
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setMobileNumber(request.getMobileNumber());

        user.getRoles().clear();
        user.setRoles(roleService.getRequestedRoles(request.getRoles()));

        return new UserResponseDto(userRepository.save(user));
    }    

    public UserResponseDto setUserIsActive(
        String jwt, String username, Boolean isActive
    ) throws BadRequestException {
        adminService.getAdminFromTokenOrElseThrow(jwt);
        User user = getUserByUsernameOrElseThrow(username);
        user.setActive(isActive);
        return new UserResponseDto(userRepository.save(user));
    }

    public UserResponseDto getUserProfile(String jwt, String username) throws BadRequestException {
        adminService.getAdminFromTokenOrElseThrow(jwt);
        return new UserResponseDto(
            getUserByUsernameOrElseThrow(username)
        );
    }

    public Page<UserSearchResultDto> searchUsers(
        String jwt, 
        String usernamePattern, Boolean isActive,
        Short numPage, Byte pageSize
    ) {
        adminService.getAdminFromTokenOrElseThrow(jwt);
        return userRepository.findAll(
            userSpecification.searchUsersSpecification(usernamePattern, isActive),
            PageableRetriever.getPageable(numPage, pageSize)
        ).map(
            u -> (
                UserSearchResultDto.builder()
                    .username(u.getUsername())
                    .roles(u.getRoles())
                    .isActive(u.isActive())
                .build()
            )
        );
    }
}
