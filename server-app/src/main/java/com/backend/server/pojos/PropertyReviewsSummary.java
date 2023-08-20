package com.backend.server.pojos;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PropertyReviewsSummary {
    private Long reviewCount;
    private Double avgStars;

    public PropertyReviewsSummary(Long reviewCount, Double avgStars) {
        this.reviewCount = reviewCount;
        this.avgStars = avgStars;
    }
}
