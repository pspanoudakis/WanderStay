package com.backend.server.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.server.entities.users.Role;

public interface RoleRepository extends JpaRepository<Role, String>{
    
    Optional<Role> findById(String id);
    
    List<Role> findAllById(Iterable<String> ids);
    
    List<Role> findAll();
}
