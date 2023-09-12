package com.backend.server.repositories;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.server.entities.properties.Property;
import com.backend.server.entities.properties.Reservation;
import com.backend.server.entities.users.Guest;

public interface ReservationRepository extends JpaRepository<Reservation, Long>{
    List<Reservation> findOneByPropertyAndGuest(Property property, Guest guest);
    List<Reservation> findAllByGuestOrderByStartDateDesc(Guest guest);
    Page<Reservation> findAllByGuestOrderByStartDateDesc(Guest guest, Pageable pageable);
}
