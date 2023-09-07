package com.backend.server.specifications;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.backend.server.entities.users.User;
import com.backend.server.entities.users.User_;

import jakarta.persistence.criteria.Predicate;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserSpecification {
    
    public Specification<User> searchUsersSpecification(
        String usernamePattern, Boolean isActive
    ) {
        return (userRoot, query, criteriaBuilder) -> {            
            List<Predicate> predicates = new ArrayList<Predicate>();
            if (usernamePattern != null) {
                predicates.add(
                    criteriaBuilder.like(
                        userRoot.get(User_.username), 
                        '%' + usernamePattern + '%'
                    )
                );
            }
            if (isActive != null) {
                predicates.add(
                    criteriaBuilder.equal(
                        userRoot.get(User_.isActive),
                        isActive
                    )
                );
            }
            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }

}
