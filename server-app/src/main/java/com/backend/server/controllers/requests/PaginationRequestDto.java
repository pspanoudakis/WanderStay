package com.backend.server.controllers.requests;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PaginationRequestDto {

    private Short pageNum;
    private Byte pageSize;
}