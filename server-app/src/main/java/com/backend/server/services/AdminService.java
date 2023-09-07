package com.backend.server.services;

import org.springframework.stereotype.Service;

import com.backend.server.entities.users.Admin;
import com.backend.server.entities.users.User;
import com.backend.server.exceptions.BadRequestException;
import com.backend.server.repositories.AdminRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdminService {
    private final AdminRepository adminRepository;
    private final AuthService authService;

    public Admin getAdminFromTokenOrElseThrow(String jwt) {
        User user = authService.getUserFromTokenOrElseThrow(jwt);
        return adminRepository.findByUser(user).orElseThrow(
            () -> new BadRequestException(
                "The provided JWT is not associated with an Admin."
            )
        );
    }
}
