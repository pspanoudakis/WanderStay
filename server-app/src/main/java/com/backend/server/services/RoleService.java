package com.backend.server.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import com.backend.server.entities.users.Role;
import com.backend.server.entities.users.RoleType;
import com.backend.server.repositories.RoleRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RoleService {

    private final RoleRepository roleRepository;

    private Role getRequiredRole(RoleType roleName) {
        return this.getRequiredRoles(List.of(roleName.toString())).get(0);
    }

    private List<Role> getRequiredRoles(List<String> roleNames) {
        try {
            List<Role> roles = roleRepository.findAllById(roleNames);
            if (roles.size() != roleNames.size()) {
                throw new RequiredRoleNotFoundException(
                    roleNames.toArray(new String[roleNames.size()])
                );
            }
            return roles;
        } catch (RequiredRoleNotFoundException e) {
            System.err.println(e.getMessage());

            return roleRepository.saveAll(
                roleNames
                    .stream()
                    .map(name -> new Role(name))
                    .collect(Collectors.toList())
            );
        }
    }
    
    @Cacheable
    public Role getGuestRole() {
        return getRequiredRole(RoleType.GUEST);
    }

    @Cacheable
    public Role getHostRole() {
        return getRequiredRole(RoleType.HOST);
    }

    @Cacheable
    public Role getAdminRole() {
        return getRequiredRole(RoleType.ADMIN);
    }
}
