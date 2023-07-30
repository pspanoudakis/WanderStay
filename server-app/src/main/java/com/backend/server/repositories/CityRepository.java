package com.backend.server.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.server.entities.cities.City;

public interface CityRepository extends JpaRepository<City, Long>{

    Optional<City> findById(Long id);
    
    List<City> findAll();
}
