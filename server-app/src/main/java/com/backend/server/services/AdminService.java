package com.backend.server.services;

import org.springframework.stereotype.Service;

import com.backend.server.entities.users.User;
import com.backend.server.exceptions.BadRequestException;
import com.backend.server.repositories.AdminRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdminService {
    private final AdminRepository adminRepository;
    private final RoleService roleService;

    public void throwIfNotAdmin(User user) throws BadRequestException {
        if (!user.hasRole(roleService.getAdminRole())) {
            throw new BadRequestException(
                "User '" + user.getUsername() + "' must be Admin."
            );
        }
        adminRepository.findByUser(user).orElseThrow(
            () -> new BadRequestException(
                "User '" + user.getUsername() + "' must be Admin."
            )
        );
    }
}
