package com.backend.server.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.backend.server.entities.users.User;

public interface UserRepository 
extends JpaRepository<User, String>, JpaSpecificationExecutor<User>{
    
    Optional<User> findByUsername(String username);

    Optional<User> findByEmail(String email);

}
