package com.backend.server.controllers.requests;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PropertySearchRequestDto {

    private PaginationRequestDto paginationInfo;
    private PropertyFiltersCriteriaDto filtersInfo;
}
