package com.backend.server.services;

import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import com.backend.server.controllers.requests.PropertyReservationRequest;
import com.backend.server.controllers.requests.PropertySearchRequestDto;
import com.backend.server.controllers.utils.ApiErrorResponse;
import com.backend.server.controllers.utils.ApiResponse;
import com.backend.server.controllers.utils.PageableRetriever;
import com.backend.server.entities.properties.AvailableTimeSlot;
import com.backend.server.entities.properties.Property;
import com.backend.server.entities.properties.Reservation;
import com.backend.server.entities.users.Guest;
import com.backend.server.repositories.PropertyRepository;
import com.backend.server.repositories.ReservationRepository;
import com.backend.server.specifications.PropertyFiltersSpecification;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PropertyService {
    private final PropertyFiltersSpecification filtersSpecification;
    private final PropertyRepository propertyRepository;
    private final ReservationRepository reservationRepository;
    private final GuestService guestService;

    private Property getPropertyFromIdOrElseThrow(Long propertyId) throws RuntimeException{
        return propertyRepository.findById(propertyId).orElseThrow(
            () -> new RuntimeException(
                    "No property found with id '" + propertyId.toString() + "'"
                )
        );
    }

    public Page<Long> searchProperties(PropertySearchRequestDto searchRequest) {
        return propertyRepository.findAll(
            filtersSpecification.getPropertyFiltersSpecification(
                searchRequest.getFiltersInfo()
            ),
            PageableRetriever.getPageable(searchRequest.getPaginationInfo())
        ).map(p -> p.getId());
    }

    @Transactional
    public ApiResponse makePropertyReservation(
        Long propertyId, String jwt,
        PropertyReservationRequest request
    ) {

        Guest guest;
        Property property;
        try {
            guest = guestService.getGuestFromTokenOrElseThrow(jwt);
            property = getPropertyFromIdOrElseThrow(propertyId);            
        } catch (RuntimeException e) {
            return new ApiErrorResponse(e.getMessage());
        }

        // Check Capacity
        if (property.getAmenities().getNumBeds() < request.getNumPersons()) {
            return new ApiErrorResponse(
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
            return new ApiErrorResponse(
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

        return new ApiResponse(true);
    }
    
}
