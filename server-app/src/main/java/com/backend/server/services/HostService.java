package com.backend.server.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.backend.server.entities.properties.Property;
import com.backend.server.entities.properties.Review;
import com.backend.server.entities.users.Host;
import com.backend.server.entities.users.User;
import com.backend.server.exceptions.BadRequestException;
import com.backend.server.repositories.HostRepository;
import com.backend.server.repositories.PropertyRepository;
import com.backend.server.repositories.ReviewRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class HostService {

    private final AuthService authService;
    private final UserService userService;
    private final AdminService adminService;
    private final HostRepository hostRepository;
    private final PropertyRepository propertyRepository;
    private final ReviewRepository reviewRepository;

    public Host getHostFromTokenOrElseThrow(String token) throws BadRequestException {

        User user = authService.getUserFromTokenOrElseThrow(token);
        return hostRepository.findByUser(user).orElseThrow(
            () -> new BadRequestException(
                    "The provided JWT is not associated with a Host."
                )
        );
    }

    private Host findHostByUsernameOrElseThrow(String username) throws BadRequestException {
        return hostRepository.findByUser(
            userService.getUserByUsernameOrElseThrow(username)
        ).orElseThrow(
            () -> new BadRequestException("No Host found with username '" + username + "'")
        );
    }

    @Transactional
    public List<Property> getAllHostProperties(
        String jwt, String username
    ) throws BadRequestException {
        adminService.getAdminFromTokenOrElseThrow(jwt);
        return propertyRepository.findAllByHost(
            findHostByUsernameOrElseThrow(username)
        );
    }

    @Transactional
    public List<Review> getAllHostReviews(
        String jwt, String username
    ) throws BadRequestException {
        adminService.getAdminFromTokenOrElseThrow(jwt);
        return reviewRepository.findAllByPropertyHost(username);
    }
}
