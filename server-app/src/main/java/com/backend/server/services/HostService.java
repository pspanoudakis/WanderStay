package com.backend.server.services;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import com.backend.server.controllers.responses.PropertyReservationDto;
import com.backend.server.entities.properties.Property;
import com.backend.server.entities.properties.Review;
import com.backend.server.entities.users.Host;
import com.backend.server.entities.users.User;
import com.backend.server.exceptions.BadRequestException;
import com.backend.server.repositories.HostRepository;
import com.backend.server.repositories.PropertyRepository;
import com.backend.server.repositories.ReservationRepository;
import com.backend.server.repositories.ReviewRepository;
import com.backend.server.services.utils.PaginationUtils;
import com.backend.server.specifications.ReservationSpecification;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class HostService {

    private final UserService userService;
    private final AdminService adminService;
    private final RoleService roleService;
    private final HostRepository hostRepository;
    private final PropertyRepository propertyRepository;
    private final ReviewRepository reviewRepository;
    private final ReservationSpecification reservationSpecification;
    private final ReservationRepository reservationRepository;

    private void throwIfHostNotActive(Host host) throws BadRequestException {
        if (!host.getUser().isActive()) {
            throw new BadRequestException(
                "Host User '" + host.getUser().getUsername() + "' is not active."
            );
        }
    }

    private Host findHostByUsernameOrElseThrow(String username) throws BadRequestException {
        Host host = hostRepository.findByUser(
            userService.getUserByUsernameOrElseThrow(username)
        ).orElseThrow(
            () -> new BadRequestException("No Host found with username '" + username + "'")
        );
        return host;
    }

    public Host getHostOrElseThrow(User user) throws BadRequestException {
        if (!user.hasRole(roleService.getHostRole())) {
            throw new BadRequestException(
                "User '" + user.getUsername() + "' must be Host."
            );
        }
        Host host = hostRepository.findByUser(user).orElseThrow(
            () -> new BadRequestException(
                "User '" + user.getUsername() + "' must be Host."
            )
        );
        throwIfHostNotActive(host);
        return host;
    }

    @Transactional
    public Page<PropertyReservationDto> getHostReservations(
        User thisHostUser, Short numPage, Byte pageSize
    ) throws BadRequestException {
        return reservationRepository.findAll(
            reservationSpecification.getHostReservations(
                getHostOrElseThrow(thisHostUser)
            ),
            PaginationUtils.getPageable(numPage, pageSize)
        ).map(r -> PropertyReservationDto.fromReservation(r));
    }
    
    @Transactional
    public Page<PropertyReservationDto> getUpcomingHostReservations(
        User thisHostUser, Short numPage, Byte pageSize
    ) throws BadRequestException {
        return reservationRepository.findAll(
            reservationSpecification.getUpcomingHostReservations(
                getHostOrElseThrow(thisHostUser)
            ),
            PaginationUtils.getPageable(numPage, pageSize)
        ).map(r -> PropertyReservationDto.fromReservation(r));
    }

    @Transactional
    public List<Property> getAllHostProperties(
        User thisUser, String targetUsername
    ) throws BadRequestException {
        adminService.throwIfNotAdmin(thisUser);
        return propertyRepository.findAllByHost(
            findHostByUsernameOrElseThrow(targetUsername)
        );
    }

    @Transactional
    public List<Review> getAllHostReviews(
        User thisUser, String targetUsername
    ) throws BadRequestException {
        adminService.throwIfNotAdmin(thisUser);
        return reviewRepository.findAllByPropertyHost(targetUsername);
    }
}
