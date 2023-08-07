package com.backend.server.controllers.requests;

import java.util.Date;
import java.util.List;

import com.backend.server.entities.properties.PropertyType;
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

    @JsonFormat(
        shape = Shape.STRING, pattern = "yyyy-MM-dd"
    )
    private Date dateFrom;
    @JsonFormat(
        shape = Shape.STRING, pattern = "yyyy-MM-dd"
    )
    private Date dateTo;

    private Byte numPersons;

    private Integer maxCostPerDay;

    private List<String> amenityFilters;
    private List<String> ruleFilters;
}
