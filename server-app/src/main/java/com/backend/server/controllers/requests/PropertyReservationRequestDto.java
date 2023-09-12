package com.backend.server.controllers.requests;

import java.util.Date;

import com.backend.server.utils.DateUtils.JsonFormatLocalDate;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PropertyReservationRequestDto {
    @JsonFormatLocalDate
    private Date dateFrom;
    @JsonFormatLocalDate
    private Date dateTo;

    private Byte numPersons;
}
