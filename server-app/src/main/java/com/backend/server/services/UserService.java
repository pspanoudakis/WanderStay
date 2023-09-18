package com.backend.server.services;

import java.io.IOException;

import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.backend.server.controllers.requests.ImageSelectionDto;
import com.backend.server.controllers.requests.UpdatedUserDetailsDto;
import com.backend.server.controllers.responses.UserResponseDto;
import com.backend.server.controllers.responses.UserSearchResultDto;
import com.backend.server.entities.images.Image;
import com.backend.server.entities.users.User;
import com.backend.server.exceptions.BadRequestException;
import com.backend.server.repositories.UserRepository;
import com.backend.server.services.utils.PaginationUtils;
import com.backend.server.specifications.UserSpecification;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {

    private final AdminService adminService;
    private final AuthService authService;
    private final RoleService roleService;
    private final ImageService imageService;
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
    
    @Transactional
    public ImageSelectionDto uploadUserImage(User thisUser, MultipartFile file) 
    throws IOException {
        Image newImage = imageService.saveImage(file, false);
        Image oldImage = thisUser.getImage();
        
        thisUser.setImage(newImage);
        userRepository.save(thisUser);
        if (oldImage != null) {
            imageService.deleteImage(oldImage);            
        }
        return ImageSelectionDto.builder().imgId(newImage.getId()).build();
    }

    public UserResponseDto setUserIsActive(
        User thisUser, String targetUsername, Boolean isActive
    ) throws BadRequestException {
        adminService.throwIfNotAdmin(thisUser);
        User targetUser = getUserByUsernameOrElseThrow(targetUsername);
        targetUser.setActive(isActive);
        return new UserResponseDto(userRepository.save(targetUser));
    }

    public UserResponseDto getUserProfile(User thisUser, String targetUsername) throws BadRequestException {
        adminService.throwIfNotAdmin(thisUser);
        return new UserResponseDto(
            getUserByUsernameOrElseThrow(targetUsername)
        );
    }

    public Page<UserSearchResultDto> searchUsers(
        User thisUser, 
        String usernamePattern, Boolean isActive,
        Short numPage, Byte pageSize
    ) {
        adminService.throwIfNotAdmin(thisUser);
        return userRepository.findAll(
            userSpecification.searchUsersSpecification(usernamePattern, isActive),
            PaginationUtils.getPageable(numPage, pageSize)
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
