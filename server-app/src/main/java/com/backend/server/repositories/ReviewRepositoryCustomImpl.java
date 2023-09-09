package com.backend.server.repositories;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.backend.server.entities.properties.Property_;
import com.backend.server.entities.properties.Review;
import com.backend.server.entities.properties.Review_;
import com.backend.server.entities.users.Host_;
import com.backend.server.entities.users.User_;
import com.backend.server.pojos.PropertyReviewsSummary;

import jakarta.persistence.EntityManager;
import jakarta.persistence.criteria.CriteriaBuilder;

@Repository
public class ReviewRepositoryCustomImpl implements ReviewRepositoryCustom {

    @Autowired
    private EntityManager entityManager;

    @Override
    public PropertyReviewsSummary getPropertyReviewsSummary(Long propertyId) {
        CriteriaBuilder builder = entityManager.getCriteriaBuilder();
        var criteriaQuery = builder.createQuery(PropertyReviewsSummary.class);
        var reviewRoot = criteriaQuery.from(Review.class);

        criteriaQuery
            .select(
                builder.construct(
                    PropertyReviewsSummary.class, 
                    builder.count(reviewRoot), builder.avg(reviewRoot.get(Review_.STARS))
                )
            )
            .where(
                builder.equal(
                    reviewRoot.get(Review_.property).get(Property_.id),
                    propertyId
                )
            );

        return entityManager.createQuery(criteriaQuery).getSingleResult();
    }

    @Override
    public List<Review> findAllByPropertyHost(String hostUsername) {
        CriteriaBuilder builder = entityManager.getCriteriaBuilder();
        var criteriaQuery = builder.createQuery(Review.class);
        var reviewRoot = criteriaQuery.from(Review.class);

        criteriaQuery
            .select(reviewRoot)
            .where(
                builder.equal(
                    reviewRoot.get(Review_.property)
                        .get(Property_.host)
                        .get(Host_.user)
                        .get(User_.username),
                    hostUsername
                )
            );
        return entityManager.createQuery(criteriaQuery).getResultList();
    }
}
