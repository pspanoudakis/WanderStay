package com.backend.server.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.backend.server.entities.properties.Property;

public interface PropertyRepository 
extends JpaRepository<Property, Long>, JpaSpecificationExecutor<Property>{}
