package com.backend.server.controllers.responses;

import java.util.Date;

import com.backend.server.entities.properties.Property;
import com.backend.server.entities.properties.PropertyType;
import com.backend.server.entities.properties.Reservation;
import com.backend.server.utils.DateUtils;
import com.backend.server.utils.DateUtils.JsonFormatLocalDate;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class PropertyReservationDto {
    private Long propertyId;
    private PropertyType propertyType;
    private String title;
    private Long imgId;

    private String hostUsername;
    private String guestUsername;
    @JsonFormatLocalDate
    private Date dateFrom;
    @JsonFormatLocalDate
    private Date dateTo;
    private Byte numPersons;
    private Integer totalPrice;

    public static PropertyReservationDto fromReservation(Reservation r) {
        Property p = r.getProperty();
        return (
            PropertyReservationDto.builder()
                .propertyId(p.getId())
                .propertyType(p.getType())
                .title(p.getName())
                .imgId(p.getMainImageId())
                .guestUsername(r.getGuest().getUser().getUsername())
                .hostUsername(p.getHost().getUser().getUsername())
                .dateFrom(r.getStartDate())
                .dateTo(r.getEndDate())
                .numPersons(r.getNumPersons())
                .totalPrice((
                    r.getNumPersons() * r.getPerGuestCost() + r.getBaseDayCost()
                ) * DateUtils.getDaysBetween(r.getStartDate(), r.getEndDate()))
            .build()
        );
    }
}
