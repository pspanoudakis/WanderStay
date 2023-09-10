package com.backend.server.repositories;

import java.util.List;

import com.backend.server.entities.properties.Review;
import com.backend.server.pojos.PropertyReviewsSummary;

public interface ReviewRepositoryCustom {
    PropertyReviewsSummary getPropertyReviewsSummary(Long propertyId);
    List<Review> findAllByPropertyHost(String hostUsername);
}
