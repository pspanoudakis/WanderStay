package com.backend.server.controllers.utils;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import com.backend.server.controllers.requests.PaginationRequestDto;

public class PageableRetriever {
    
    public static Pageable getPageable(PaginationRequestDto request) {
        Short pageNum = request.getPageNum();
        Byte pageSize = request.getPageSize();
        return PageRequest.of(
            pageNum != null ? pageNum : 0, 
            pageSize != null ? pageSize : 1
        );
    }
}
