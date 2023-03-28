package com.backend.server.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.server.entities.user.User;

public interface UserRepository extends JpaRepository<User, String>{
    
    Optional<User> findByUsername(String username);

    Optional<User> findByEmail(String email);

}
