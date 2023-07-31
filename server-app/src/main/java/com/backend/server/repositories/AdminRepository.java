package com.backend.server.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.server.entities.users.Admin;
import com.backend.server.entities.users.User;

public interface AdminRepository extends JpaRepository<Admin, String>{
    
    Optional<Admin> findByUser(User user);

}
