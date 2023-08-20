package com.backend.server.services;

import org.springframework.stereotype.Service;

import com.backend.server.entities.users.Guest;
import com.backend.server.entities.users.User;
import com.backend.server.exceptions.BadRequestException;
import com.backend.server.repositories.GuestRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class GuestService {

    private final GuestRepository guestRepository;
    private final AuthService authService;

    public Guest getGuestFromTokenOrElseThrow(String token) throws BadRequestException {

        User user = authService.getUserFromTokenOrElseThrow(token);
        return guestRepository.findByUser(user).orElseThrow(
            () -> new BadRequestException(
                    "The provided JWT is not associated with a Guest."
                )
        );
    }
}
