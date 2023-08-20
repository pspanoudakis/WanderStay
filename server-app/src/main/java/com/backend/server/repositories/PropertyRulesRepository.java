package com.backend.server.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.server.entities.properties.PropertyRules;

public interface PropertyRulesRepository
extends JpaRepository<PropertyRules, Long>{
    
}