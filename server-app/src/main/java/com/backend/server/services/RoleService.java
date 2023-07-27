package com.backend.server.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import com.backend.server.entities.users.Role;
import com.backend.server.entities.users.RoleLiteral;
import com.backend.server.repositories.RoleRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RoleService {

    private final RoleRepository roleRepository;

    @Cacheable
    private Role getRequiredRole(String roleName) {
        return this.getRequiredRoles(List.of(roleName)).get(0);
    }

    @Cacheable
    public List<Role> getRequiredRoles(List<String> roleNames) {
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
        return getRequiredRole(RoleLiteral.GUEST.name());
    }

    @Cacheable
    public Role getHostRole() {
        return getRequiredRole(RoleLiteral.HOST.name());
    }

    @Cacheable
    public Role getAdminRole() {
        return getRequiredRole(RoleLiteral.ADMIN.name());
    }
}
