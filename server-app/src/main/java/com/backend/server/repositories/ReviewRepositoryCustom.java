package com.backend.server.repositories;

import com.backend.server.pojos.PropertyReviewsSummary;

public interface ReviewRepositoryCustom {
    PropertyReviewsSummary getPropertyReviewsSummary(Long propertyId);
}
