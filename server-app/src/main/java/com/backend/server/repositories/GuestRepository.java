package com.backend.server.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.server.entities.users.Guest;
import com.backend.server.entities.users.User;

public interface GuestRepository extends JpaRepository<Guest, String>{
    
    Optional<Guest> findByUser(User user);

}
