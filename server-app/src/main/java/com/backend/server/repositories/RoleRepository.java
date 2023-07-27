package com.backend.server.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.server.entities.users.Role;

public interface RoleRepository extends JpaRepository<Role, String>{
    
    @Cacheable
    Optional<Role> findById(String id);
    
    @Cacheable
    List<Role> findAllById(Iterable<String> ids);
    
    @Cacheable
    List<Role> findAll();
}
