package com.backend.server.services;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.backend.server.controllers.requests.ImageSelectionDto;
import com.backend.server.controllers.requests.PropertyReservationRequestDto;
import com.backend.server.controllers.requests.PropertyReviewRequestDto;
import com.backend.server.controllers.requests.PropertySearchRequestDto;
import com.backend.server.controllers.requests.PropertyUpdatedDetailsDto;
import com.backend.server.controllers.responses.ApiErrorResponseDto;
import com.backend.server.controllers.responses.ApiResponseDto;
import com.backend.server.controllers.responses.PropertyBasicInfoDto;
import com.backend.server.controllers.responses.PropertyDetailsDto;
import com.backend.server.controllers.responses.PropertyHostSidePreviewDto;
import com.backend.server.controllers.responses.PropertySearchResultDto;
import com.backend.server.controllers.responses.ReviewDto;
import com.backend.server.controllers.responses.PropertyBasicInfoDto.PropertyBasicInfoDtoBuilder;
import com.backend.server.entities.images.Image;
import com.backend.server.entities.properties.AvailableTimeSlot;
import com.backend.server.entities.properties.Property;
import com.backend.server.entities.properties.PropertyAmenities;
import com.backend.server.entities.properties.PropertyRules;
import com.backend.server.entities.properties.PublicTransportAccesses;
import com.backend.server.entities.properties.Reservation;
import com.backend.server.entities.properties.Review;
import com.backend.server.entities.users.Guest;
import com.backend.server.entities.users.Host;
import com.backend.server.entities.users.User;
import com.backend.server.exceptions.BadRequestException;
import com.backend.server.pojos.PropertyReviewsSummary;
import com.backend.server.repositories.PropertyRepository;
import com.backend.server.repositories.ReservationRepository;
import com.backend.server.repositories.ReviewRepository;
import com.backend.server.services.utils.PaginationUtils;
import com.backend.server.specifications.PropertyFiltersSpecification;
import com.backend.server.utils.DateUtils;

import jakarta.transaction.Transactional;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Setter
@Getter
class PropertyDetailsResponseDto extends ApiResponseDto {
    PropertyDetailsDto propertyDetails;
    PropertyDetailsResponseDto(PropertyDetailsDto pd) {
        super(true);
        propertyDetails = pd;
    }
}

@Setter
@Getter
class SavedImageResponseDto extends ApiResponseDto {
    Long imageId;
    SavedImageResponseDto(Long id) {
        super(true);
        imageId = id;
    }    
}

@Service
@RequiredArgsConstructor
public class PropertyService {
    private final PropertyFiltersSpecification filtersSpecification;
    private final GuestService guestService;
    private final HostService hostService;
    private final LocationService locationService;
    private final ImageService imageService;
    private final PropertyRepository propertyRepository;
    private final ReservationRepository reservationRepository;
    private final ReviewRepository reviewRepository;

    public Property getPropertyFromIdOrElseThrow(Long propertyId) throws BadRequestException{
        return propertyRepository.findById(propertyId).orElseThrow(
            () -> new BadRequestException(
                    "No property found with id '" + propertyId.toString() + "'"
                )
        );
    }

    @Transactional
    private <B extends PropertyBasicInfoDtoBuilder<? extends PropertyBasicInfoDto, B>> 
    B initBasicPropertyDtoBuilder(Property p, PropertyBasicInfoDtoBuilder<?, B> builder) {
        return (
            builder
                .propertyId(p.getId())
                .propertyType(p.getType())
                .title(p.getName())
                .description(p.getDescription())
                .reviewsSummary(getPropertyReviewsSummary(p.getId()))
        );
    }

    public void throwIfNotOwner(Host host, Property property) throws BadRequestException {
        if (!property.getHost().getUser().getUsername().equals(
            host.getUser().getUsername())) {
            throw new BadRequestException(
                "This Host does not own a property with the given ID."
            );
        }
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
                PaginationUtils.getPageable(searchRequest.getPaginationInfo())
            ).map(p -> {
                int pricePerNight = (
                    p.getRules().getBaseDayCost() +
                    (p.getRules().getPerGuestCost() * (
                        (searchRequest.getFiltersInfo().getNumPersons() != null) ?
                        searchRequest.getFiltersInfo().getNumPersons() : 0
                    ))
                );
                return (
                    initBasicPropertyDtoBuilder(p, PropertySearchResultDto.builder())
                        .imgId(p.getMainImageId())
                        .numBeds(p.getAmenities().getNumBeds())
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
        Long propertyId, User thisGuestUser,
        PropertyReservationRequestDto request
    ) throws BadRequestException{

        Guest guest = guestService.getGuestOrElseThrow(thisGuestUser);
        Property property = getPropertyFromIdOrElseThrow(propertyId);

        // Check Capacity
        if (property.getAmenities().getNumBeds() < request.getNumPersons()) {
            return new ApiErrorResponseDto("INSUFFICIENT_CAPACITY");
        }
        
        // Check Minimum Reservation Days
        if (request.getDateFrom() == null || request.getDateTo() == null ||
            (
                DateUtils.getDaysBetween(
                    request.getDateFrom(), request.getDateTo()
                ) < property.getRules().getMinReservationDays()
            )) {
            return new ApiErrorResponseDto("MIN_DURATION_UNSATISFIED");
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
            return new ApiErrorResponseDto("UNAVAILABLE_DURING_DATE_RANGE");
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
                .baseDayCost(property.getRules().getBaseDayCost())
                .perGuestCost(property.getRules().getPerGuestCost())
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
            PaginationUtils.getPageable(numPage, pageSize)
        ).map(r -> {
            return (
                ReviewDto.builder()
                    .guestUsername(r.getGuest().getUser().getUsername())
                    .guestImg(r.getGuest().getUser().getImage())
                    .createdOn(r.getCreatedOn())
                    .stars(r.getStars())
                    .text(r.getText())
                    .build()
            );
        });
    }

    @Transactional
    public ApiResponseDto createOrUpdatePropertyReview(
        Long propertyId, User thisGuestUser,
        PropertyReviewRequestDto request
    ) throws BadRequestException {
        Guest guest = guestService.getGuestOrElseThrow(thisGuestUser);
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

    public ImageSelectionDto addPropertyImage(
        Long propertyId, User thisHostUser,
        MultipartFile file, boolean isMain
    ) throws BadRequestException, IOException{
        Host host = hostService.getHostOrElseThrow(thisHostUser);

        Property property = null;
        if (propertyId != null) {
            property = getPropertyFromIdOrElseThrow(propertyId);
            throwIfNotOwner(host, property);
        }
        Image newImage = imageService.saveImage(file, isMain);
        if (property != null) {
            property.getImages().add(newImage);
            propertyRepository.save(property);
        }

        return (
            ImageSelectionDto.builder()
                .imgId(newImage.getId())
                .isMain(newImage.isMain())
                .build()
        );
    }

    @Transactional
    private PropertyDetailsResponseDto mapPropertyToDetailsDto(Property property) {
        return new PropertyDetailsResponseDto(
            initBasicPropertyDtoBuilder(property, PropertyDetailsDto.builder())
                .hostName(property.getHost().getUser().getUsername())
                .hostImg(property.getHost().getUser().getImage())
                .images(property.getImages())
                .availableSlots(property.getAvailableSlots())
                .amenities(property.getAmenities())
                .rules(property.getRules())
                .transport(property.getTransport())
                .spaceArea(property.getSpaceArea())
                .address(property.getAddress())
                .city(property.getCity())
                .country(property.getCity().getCountry())
                .latitude(property.getLatitude())
                .longitude(property.getLongitude())
                .build()
        );
    }

    @Transactional
    public PropertyDetailsResponseDto getOwnedPropertyDetails(User thisHostUser, Long propertyId)
    throws BadRequestException {
        Host host = hostService.getHostOrElseThrow(thisHostUser);
        Property property = getPropertyFromIdOrElseThrow(propertyId);
        throwIfNotOwner(host, property);
        return mapPropertyToDetailsDto(property);
    }
    
    @Transactional
    public PropertyDetailsResponseDto getPropertyDetails(Long propertyId)
    throws BadRequestException {
        Property property = getPropertyFromIdOrElseThrow(propertyId);
        return mapPropertyToDetailsDto(property);
    }

    @Transactional
    private Property buildNewProperty(Host host) {
        Property property = propertyRepository.save(
            Property.builder()
                .host(host)
                .name("New Property")
                .images(new ArrayList<>())
                .availableSlots(new ArrayList<>())
                .spaceArea((short)1)
                .build()
        );
        property.setAmenities(
            PropertyAmenities.builder()
                .property(property)
                .build()
        );
        property.setRules(
            PropertyRules.builder()
                .property(property)  
                .build()
        );
        property.setTransport(
            PublicTransportAccesses.builder()
                .property(property)
                .build()
        );

        return propertyRepository.save(property);
    }

    @Transactional
    public PropertyDetailsResponseDto createOrUpdateProperty(
        Long propertyId, User thisHostUser,
        PropertyUpdatedDetailsDto request
    ) throws BadRequestException {
        Host host = hostService.getHostOrElseThrow(thisHostUser);

        Property property = propertyId != null ? (
            propertyRepository.findById(propertyId)
                .orElseThrow(() -> new BadRequestException("No property found with id: " + propertyId.toString()))
        ) : buildNewProperty(host);
        throwIfNotOwner(host, property);

        property.setName(request.getTitle());
        property.setType(request.getPropertyType());
        property.setDescription(request.getDescription());
        
        property.getAvailableSlots().clear();
        property.getAvailableSlots().addAll(
            request.getAvailableSlots().stream()
                .map(s -> {
                    s.setProperty(property);
                    return s;
                })
                .collect(Collectors.toList())
        );

        property.getAmenities().update(request.getAmenities());
        property.getRules().update(request.getRules());
        property.getTransport().update(request.getTransport());

        property.setSpaceArea(request.getSpaceArea());
        property.setCity(
            locationService.getCityFromIdOrElseThrow(request.getCityId())
        );
        property.setAddress(request.getAddress());
        property.setLongitude(request.getLongitude());
        property.setLatitude(request.getLatitude());

        List<Image> newImages = request.getImageSelections().stream().map(
            (n) -> {
                Image img = imageService.getImageFromIdOrElseThrow(n.getImgId());
                img.setMain(n.isMain());
                return img;
            }
        ).collect(Collectors.toList());
        imageService.broadcastImageDeletionsToFs(newImages, property.getImages());
        property.getImages().clear();
        property.getImages().addAll(newImages);

        return mapPropertyToDetailsDto(
            propertyRepository.save(property)
        );
    }

    @Transactional
    public Page<PropertyHostSidePreviewDto> getHostProperties(
        User thisHostUser, Short numPage, Byte pageSize
    ) throws BadRequestException {
        return propertyRepository.findByHost(
            hostService.getHostOrElseThrow(thisHostUser), 
            PaginationUtils.getPageable(numPage, pageSize)
        ).map(p -> (
            initBasicPropertyDtoBuilder(p, PropertyHostSidePreviewDto.builder())
                .imgId(p.getMainImageId())
                .location(p.getFullLocationString())
            .build()
        ));
    }

}
