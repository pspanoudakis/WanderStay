package com.backend.server.specifications;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.backend.server.controllers.requests.PropertyFiltersCriteriaDto;
import com.backend.server.entities.locations.City_;
import com.backend.server.entities.locations.Country_;
import com.backend.server.entities.properties.AvailableTimeSlot;
import com.backend.server.entities.properties.AvailableTimeSlot_;
import com.backend.server.entities.properties.Property;
import com.backend.server.entities.properties.PropertyAmenities_;
import com.backend.server.entities.properties.PropertyRules_;
import com.backend.server.entities.properties.Property_;
import com.backend.server.utils.DateUtils;

import jakarta.persistence.criteria.Expression;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import jakarta.persistence.criteria.Subquery;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PropertyFiltersSpecification {

    public Specification<Property> getPropertyFiltersSpecification(
        PropertyFiltersCriteriaDto searchFilters
    ) {
        return (propertyRoot, propertyQuery, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<Predicate>();

            if (searchFilters.getCityId() != null) {
                predicates.add(
                    criteriaBuilder.equal(
                        propertyRoot.join(Property_.city).get(City_.id), 
                        searchFilters.getCityId()
                    )
                );
            } else if (searchFilters.getCountryId() != null) {
                predicates.add(
                    criteriaBuilder.equal(
                        propertyRoot.join(Property_.city).join(City_.country).get(Country_.id), 
                        searchFilters.getCountryId()
                    )
                );
            }

            if (searchFilters.getType() != null) {
                predicates.add(
                    criteriaBuilder.equal(
                        propertyRoot.get(Property_.type),
                        searchFilters.getType()
                    )
                );
            }

            var propertyRulesJoin = propertyRoot.join(Property_.rules);
            if (searchFilters.getDateFrom() != null && searchFilters.getDateTo() != null) {
             
                Expression<Integer> totalCostPerDayExpression = (
                    criteriaBuilder.sum(
                        propertyRulesJoin.get(PropertyRules_.baseDayCost),
                        criteriaBuilder.prod(
                            propertyRulesJoin.get(PropertyRules_.perGuestCost),
                            (int) searchFilters.getNumPersons()
                        )
                    )
                );
                // We need given date range to find total days and total costs to order by
                propertyQuery.orderBy(
                    criteriaBuilder.asc(totalCostPerDayExpression)
                );

                if (searchFilters.getMaxCostPerDay() != null) {
                    predicates.add(
                        criteriaBuilder.lessThanOrEqualTo(
                            totalCostPerDayExpression,
                            searchFilters.getMaxCostPerDay()
                        )
                    );
                }
                predicates.add(
                    criteriaBuilder.lessThanOrEqualTo(
                        propertyRulesJoin.get(PropertyRules_.minReservationDays),
                        DateUtils.getDaysBetween(
                            searchFilters.getDateFrom(), 
                            searchFilters.getDateTo()
                        )
                    )
                );
                
                Subquery<AvailableTimeSlot> slotSubquery = 
                    propertyQuery.subquery(AvailableTimeSlot.class);
                Root<AvailableTimeSlot> slotRoot = 
                    slotSubquery.from(AvailableTimeSlot.class);
                predicates.add(
                    criteriaBuilder.exists(
                        slotSubquery
                            .select(slotRoot)
                            .where(
                                criteriaBuilder.equal(
                                    slotRoot.join(AvailableTimeSlot_.property).get(Property_.id),
                                    propertyRoot.get(Property_.id)
                                ),
                                criteriaBuilder.lessThanOrEqualTo(
                                    slotRoot.get(AvailableTimeSlot_.startDate),
                                    searchFilters.getDateFrom()
                                ),
                                criteriaBuilder.greaterThanOrEqualTo(
                                    slotRoot.get(AvailableTimeSlot_.endDate),
                                    searchFilters.getDateTo()
                                )
                            )
                    )
                );
            }

            var propertyAmenitiesJoin = propertyRoot.join(Property_.amenities);
            if (searchFilters.getNumPersons() != null) {
                predicates.add(
                    criteriaBuilder.greaterThanOrEqualTo(
                        propertyAmenitiesJoin.get(PropertyAmenities_.numBeds),
                        searchFilters.getNumPersons()
                    )
                );
            }            
            if (searchFilters.getAmenityFilters() != null) {
                for (var filter: searchFilters.getAmenityFilters()) {
                    predicates.add(
                        criteriaBuilder.isTrue(
                            propertyAmenitiesJoin.get(filter)
                        )
                    );
                }                
            }

            if (searchFilters.getRuleFilters() != null) {
                for (var filter: searchFilters.getRuleFilters()) {
                    predicates.add(
                        criteriaBuilder.isTrue(
                            propertyRulesJoin.get(filter)
                        )
                    );
                }
            }
            
            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }

}
