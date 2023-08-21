package com.backend.server.services;

import java.util.Date;

import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import com.backend.server.controllers.requests.PropertyReservationRequestDto;
import com.backend.server.controllers.requests.PropertyReviewRequestDto;
import com.backend.server.controllers.requests.PropertySearchRequestDto;
import com.backend.server.controllers.responses.ApiErrorResponseDto;
import com.backend.server.controllers.responses.ApiResponseDto;
import com.backend.server.controllers.responses.PropertySearchResultDto;
import com.backend.server.controllers.responses.ReviewDto;
import com.backend.server.entities.properties.AvailableTimeSlot;
import com.backend.server.entities.properties.Property;
import com.backend.server.entities.properties.Reservation;
import com.backend.server.entities.properties.Review;
import com.backend.server.entities.users.Guest;
import com.backend.server.exceptions.BadRequestException;
import com.backend.server.pojos.PropertyReviewsSummary;
import com.backend.server.repositories.PropertyRepository;
import com.backend.server.repositories.ReservationRepository;
import com.backend.server.repositories.ReviewRepository;
import com.backend.server.services.utils.PageableRetriever;
import com.backend.server.specifications.PropertyFiltersSpecification;
import com.backend.server.utils.DateUtils;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PropertyService {
    private final PropertyFiltersSpecification filtersSpecification;
    private final GuestService guestService;
    private final PropertyRepository propertyRepository;
    private final ReservationRepository reservationRepository;
    private final ReviewRepository reviewRepository;

    private Property getPropertyFromIdOrElseThrow(Long propertyId) throws BadRequestException{
        return propertyRepository.findById(propertyId).orElseThrow(
            () -> new BadRequestException(
                    "No property found with id '" + propertyId.toString() + "'"
                )
        );
    }

    public PropertyReviewsSummary getPropertyReviewsSummary(Long propertyId) {
        return reviewRepository.getPropertyReviewsSummary(propertyId);
    }

    public Page<PropertySearchResultDto> searchProperties(PropertySearchRequestDto searchRequest) {
        return (
            propertyRepository.findAll(
                filtersSpecification.getPropertyFiltersSpecification(
                    searchRequest.getFiltersInfo()
                ),
                PageableRetriever.getPageable(searchRequest.getPaginationInfo())
            ).map(p -> {
                int pricePerNight = (
                    p.getRules().getBaseDayCost() +
                    (p.getRules().getPerGuestCost() * searchRequest.getFiltersInfo().getNumPersons())
                );
                return (
                    PropertySearchResultDto.builder()
                        .propertyId(p.getId())
                        .title(p.getName())
                        .description(p.getDescription())
                        .imgId(null)
                        .numBeds(p.getAmenities().getNumBeds())
                        .reviewsSummary(getPropertyReviewsSummary(p.getId()))
                        .pricePerNight(pricePerNight)
                        .totalPrice(
                            Math.max(
                                DateUtils.getDaysBetween(
                                    searchRequest.getFiltersInfo().getDateFrom(),
                                    searchRequest.getFiltersInfo().getDateTo()
                                ),
                                1
                            ) * pricePerNight
                        )
                        .build()
                );
            })
        );
    }

    @Transactional
    public ApiResponseDto makePropertyReservation(
        Long propertyId, String jwt,
        PropertyReservationRequestDto request
    ) throws BadRequestException{

        Guest guest = guestService.getGuestFromTokenOrElseThrow(jwt);
        Property property = getPropertyFromIdOrElseThrow(propertyId);

        // Check Capacity
        if (property.getAmenities().getNumBeds() < request.getNumPersons()) {
            return new ApiErrorResponseDto(
                "This property has insufficient capacity for the specified reservation."
            );
        }
        
        // Find available slot for the reservation and modify accordingly
        var availableSlots = property.getAvailableSlots();
        var slotsIterator = availableSlots.listIterator();
        boolean slotFound = false;
        while (slotsIterator.hasNext()) {
            AvailableTimeSlot slot = slotsIterator.next();
            if (
                slot.getStartDate().compareTo(request.getDateFrom()) <= 0 &&
                request.getDateTo().compareTo(slot.getEndDate()) <= 0
            ) {
                slotFound = true;
                
                if (slot.getStartDate().compareTo(request.getDateFrom()) == 0) {
                    if (request.getDateTo().compareTo(slot.getEndDate()) == 0) {
                        slotsIterator.remove();
                    }
                    else /* if (request.getDateTo().compareTo(slot.getEndDate()) < 0) */ {
                        slot.setStartDate(request.getDateTo());
                    }
                }
                else /* if (slot.getStartDate().compareTo(request.getDateFrom()) < 0) */ {
                    if (request.getDateTo().compareTo(slot.getEndDate()) < 0) {
                        slotsIterator.add(
                            AvailableTimeSlot.builder()
                            .property(property)
                            .startDate(request.getDateTo())
                            .endDate(slot.getEndDate())
                            .build()
                        );
                    }
                    slot.setEndDate(request.getDateFrom());
                }
                break;
            }
        }
        if (!slotFound) {
            return new ApiErrorResponseDto(
                "This property is not available during the specified date range."
            );
        }

        // Ok, update property (slots) and create reservation
        property.setAvailableSlots(availableSlots);
        propertyRepository.save(property);
        reservationRepository.save(
            Reservation.builder()
                .property(property)
                .guest(guest)
                .startDate(request.getDateFrom())
                .endDate(request.getDateTo())
                .numPersons(request.getNumPersons())
                .build()
        );
        return new ApiResponseDto(true);
    }
    
    @Transactional
    public Page<ReviewDto> getPropertyReviews(
        Long propertyId, 
        Short numPage, Byte pageSize
    ) throws BadRequestException {
        return reviewRepository.findAllByPropertyOrderByCreatedOnDesc(
            getPropertyFromIdOrElseThrow(propertyId),
            PageableRetriever.getPageable(numPage, pageSize)
        ).map(r -> {
            return (
                ReviewDto.builder()
                    .guestUsername(r.getGuest().getUser().getUsername())
                    .createdOn(r.getCreatedOn())
                    .stars(r.getStars())
                    .text(r.getText())
                    .build()
            );
        });
    }

    @Transactional
    public ApiResponseDto createOrUpdatePropertyReview(
        Long propertyId, String jwt,
        PropertyReviewRequestDto request
    ) throws BadRequestException {
        Guest guest = guestService.getGuestFromTokenOrElseThrow(jwt);
        Property property = getPropertyFromIdOrElseThrow(propertyId);

        if (reservationRepository.findOneByPropertyAndGuest(property, guest).size() == 0) {
            throw new BadRequestException("NO_RESERVATION_HISTORY");
        }
        
        // Find existing review from this guest or create a new one
        Review review = reviewRepository.findOneByPropertyAndGuest(property, guest).orElseGet(
            () -> new Review()
        );
        review.setGuest(guest);
        review.setProperty(property);
        review.setStars(request.getStars());
        review.setText(request.getText());
        review.setCreatedOn(new Date());

        reviewRepository.save(review);
        return new ApiResponseDto(true);
    }
}
