package com.backend.server.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.server.entities.users.Host;
import com.backend.server.entities.users.User;

public interface HostRepository extends JpaRepository<Host, String>{
    
    Optional<Host> findByUser(User user);

}
