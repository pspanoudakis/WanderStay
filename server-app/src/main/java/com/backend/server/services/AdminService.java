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
    private final RoleService roleService;

    public Admin getAdminFromTokenOrElseThrow(String jwt)
    throws BadRequestException  {
        User user = authService.getUserFromTokenOrElseThrow(jwt);
        return adminRepository.findByUser(user).orElseThrow(
            () -> new BadRequestException(
                "The provided JWT is not associated with an Admin."
            )
        );
    }

    public void throwIfNotAdmin(User user) throws BadRequestException {
        if (!user.hasRole(roleService.getAdminRole())) {
            throw new BadRequestException(
                "User '" + user.getUsername() + "' must be Admin."
            );
        }
    }
}
