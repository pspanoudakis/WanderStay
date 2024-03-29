package com.backend.server.services.utils;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import com.backend.server.controllers.requests.PaginationRequestDto;

public class PaginationUtils {
    
    public static Pageable getPageable(PaginationRequestDto request) {
        Short pageNum = request.getPageNum();
        Byte pageSize = request.getPageSize();
        return getPageable(pageNum, pageSize);
    }

    public static Pageable getPageable(Short pageNum, Byte pageSize) {
        return PageRequest.of(
            pageNum != null ? pageNum : 0, 
            pageSize != null ? pageSize : 1
        );
    }
}
