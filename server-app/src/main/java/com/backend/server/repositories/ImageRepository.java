package com.backend.server.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.server.entities.images.Image;

public interface ImageRepository extends JpaRepository<Image, Long>{
    
}
