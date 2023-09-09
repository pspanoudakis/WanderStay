package com.backend.server.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.backend.server.entities.properties.Property;
import com.backend.server.entities.users.Host;

public interface PropertyRepository 
extends JpaRepository<Property, Long>, JpaSpecificationExecutor<Property>{
    List<Property> findAllByHost(Host host);
}
