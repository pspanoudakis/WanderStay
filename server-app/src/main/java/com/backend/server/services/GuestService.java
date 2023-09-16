package com.backend.server.services;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import com.backend.server.controllers.responses.PropertyReservationDto;
import com.backend.server.entities.properties.Reservation;
import com.backend.server.entities.properties.Review;
import com.backend.server.entities.users.Guest;
import com.backend.server.entities.users.User;
import com.backend.server.exceptions.BadRequestException;
import com.backend.server.repositories.GuestRepository;
import com.backend.server.repositories.ReservationRepository;
import com.backend.server.repositories.ReviewRepository;
import com.backend.server.services.utils.PaginationUtils;
import com.backend.server.specifications.ReservationSpecification;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class GuestService {
    
    private final AdminService adminService;
    private final UserService userService;
    private final AuthService authService;
    private final ReservationSpecification reservationSpecification;
    private final ReservationRepository reservationRepository;
    private final ReviewRepository reviewRepository;
    private final GuestRepository guestRepository;

    private Guest findGuestByUsernameOrElseThrow(String username) throws BadRequestException {
        return guestRepository.findByUser(
            userService.getUserByUsernameOrElseThrow(username)
        ).orElseThrow(
            () -> new BadRequestException("No Guest found with username '" + username + "'")
        );
    }

    public Guest getGuestFromTokenOrElseThrow(String token) throws BadRequestException {
        User user = authService.getUserFromTokenOrElseThrow(token);
        return guestRepository.findByUser(user).orElseThrow(
            () -> new BadRequestException(
                    "The provided JWT is not associated with a Guest."
                )
        );
    }

    @Transactional
    public Page<PropertyReservationDto> getGuestReservations(
        String jwt, Short numPage, Byte pageSize
    ) throws BadRequestException {
        return reservationRepository.findAllByGuestOrderByStartDateDesc(
            getGuestFromTokenOrElseThrow(jwt),
            PaginationUtils.getPageable(numPage, pageSize)
        ).map(r -> PropertyReservationDto.fromReservation(r));
    }

    @Transactional
    public Page<PropertyReservationDto> getUpcomingGuestReservations(
        String jwt, Short numPage, Byte pageSize
    ) throws BadRequestException {
        return reservationRepository.findAll(
            reservationSpecification.getUpcomingGuestReservations(
                getGuestFromTokenOrElseThrow(jwt)
            ),
            PaginationUtils.getPageable(numPage, pageSize)
        ).map(r -> PropertyReservationDto.fromReservation(r));
    }

    @Transactional
    public List<Reservation> getAllGuestReservations(
        User thisUser, String targetUsername
    ) throws BadRequestException {
        adminService.throwIfNotAdmin(thisUser);
        return reservationRepository.findAllByGuestOrderByStartDateDesc(
            findGuestByUsernameOrElseThrow(targetUsername)
        );
    }

    @Transactional
    public List<Review> getAllGuestReviews(
        User thisUser, String targetUsername
    ) throws BadRequestException {
        adminService.throwIfNotAdmin(thisUser);
        return reviewRepository.findAllByGuest(
            findGuestByUsernameOrElseThrow(targetUsername)
        );
    }
}
