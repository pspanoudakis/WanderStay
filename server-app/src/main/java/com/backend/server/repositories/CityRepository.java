package com.backend.server.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.server.entities.locations.City;
import com.backend.server.entities.locations.Country;

public interface CityRepository extends JpaRepository<City, Long>{

    Optional<City> findById(Long id);
    
    List<City> findAll();

    List<City> findByCountryOrderByNameAsc(Country country);
}
