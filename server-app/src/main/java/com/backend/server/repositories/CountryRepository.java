package com.backend.server.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.server.entities.locations.Country;

public interface CountryRepository extends JpaRepository<Country, Long>{
    
    Optional<Country> findByName(String name);

    Optional<Country> findById(Long id);

    List<Country> findAllByOrderByNameAsc();
}
