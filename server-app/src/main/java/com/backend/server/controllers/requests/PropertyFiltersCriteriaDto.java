package com.backend.server.controllers.requests;

import java.util.Date;
import java.util.List;

import com.backend.server.entities.properties.PropertyType;
import com.backend.server.utils.DateUtils.JsonFormatLocalDate;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonFormat.Shape;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PropertyFiltersCriteriaDto {

    private Long countryId;
    private Long cityId;

    @JsonFormat(
        shape = Shape.STRING
    )
    private PropertyType type;

    @JsonFormatLocalDate
    private Date dateFrom;
    @JsonFormatLocalDate
    private Date dateTo;

    private Byte numPersons;

    private Integer maxCostPerDay;

    private List<String> amenityFilters;
    private List<String> ruleFilters;
}
