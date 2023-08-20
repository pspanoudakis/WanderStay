package com.backend.server.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.server.entities.properties.Property;
import com.backend.server.entities.properties.Review;

public interface ReviewRepository extends JpaRepository<Review, Long>, ReviewRepositoryCustom{
    Page<Review> findAllByPropertyOrderByCreatedOnDesc(
        Property property, 
        Pageable pageable
    );    
}
