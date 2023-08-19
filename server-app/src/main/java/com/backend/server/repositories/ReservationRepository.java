package com.backend.server.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.server.entities.properties.Reservation;

public interface ReservationRepository extends JpaRepository<Reservation, Long>{
    
}
