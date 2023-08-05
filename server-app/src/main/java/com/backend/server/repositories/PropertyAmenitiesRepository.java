package com.backend.server.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.server.entities.properties.PropertyAmenities;

public interface PropertyAmenitiesRepository extends JpaRepository<PropertyAmenities, Long>{
    
}
