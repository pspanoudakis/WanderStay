package com.backend.server.controllers.requests;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonFormat.Shape;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PropertyReservationRequestDto {
    @JsonFormat(
        shape = Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Europe/Athens"
    )
    private Date dateFrom;
    @JsonFormat(
        shape = Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Europe/Athens"
    )
    private Date dateTo;

    private Byte numPersons;
}
