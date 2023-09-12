package com.backend.server.specifications;

import java.util.Date;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.backend.server.entities.properties.Property_;
import com.backend.server.entities.properties.Reservation;
import com.backend.server.entities.properties.Reservation_;
import com.backend.server.entities.users.Guest;
import com.backend.server.entities.users.Guest_;
import com.backend.server.entities.users.Host;
import com.backend.server.entities.users.Host_;
import com.backend.server.entities.users.User_;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ReservationSpecification {

    private void setOrderByClause(
        Root<Reservation> root, 
        CriteriaQuery<?> query, 
        CriteriaBuilder builder
    ) {
        query.orderBy(
            builder.asc(
                root.get(Reservation_.startDate)
            )
        );
    }

    private Predicate getUpcomingStartDatePredicate(
        Root<Reservation> root,
        CriteriaBuilder builder
    ) {
        return builder.greaterThanOrEqualTo(
            root.get(Reservation_.startDate), new Date()
        );
    }

    public Specification<Reservation> getUpcomingGuestReservations(Guest guest) {
        return (reservationRoot, crtieriaQuery, criteriaBuilder) -> {
            setOrderByClause(reservationRoot, crtieriaQuery, criteriaBuilder);
            return criteriaBuilder.and(
                criteriaBuilder.equal(
                    reservationRoot
                        .join(Reservation_.guest)
                        .join(Guest_.user)
                        .get(User_.username),
                    guest.getUser().getUsername()
                ),
                getUpcomingStartDatePredicate(reservationRoot, criteriaBuilder)
            );
        };
    }

    public Specification<Reservation> getHostReservations(Host host) {
        return (reservationRoot, crtieriaQuery, criteriaBuilder) -> {
            setOrderByClause(reservationRoot, crtieriaQuery, criteriaBuilder);
            return criteriaBuilder.equal(
                reservationRoot
                    .join(Reservation_.property)
                    .join(Property_.host)
                    .join(Host_.user)
                    .get(User_.username),
                host.getUser().getUsername()
            );
        };
    }

    public Specification<Reservation> getUpcomingHostReservations(Host host) {
        return (reservationRoot, crtieriaQuery, criteriaBuilder) -> {
            setOrderByClause(reservationRoot, crtieriaQuery, criteriaBuilder);
            return criteriaBuilder.and(
                criteriaBuilder.equal(
                    reservationRoot
                        .join(Reservation_.property)
                        .join(Property_.host)
                        .join(Host_.user)
                        .get(User_.username),
                    host.getUser().getUsername()
                ),
                getUpcomingStartDatePredicate(reservationRoot, criteriaBuilder)
            );
        };
    }
}
