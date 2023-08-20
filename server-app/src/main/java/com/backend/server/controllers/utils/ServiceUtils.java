package com.backend.server.controllers.utils;

import com.backend.server.controllers.responses.ApiErrorResponseDto;

public final class ServiceUtils {
    public static ApiErrorResponseDto createErrorResponse(Exception e) {
        return new ApiErrorResponseDto(e.getMessage());
    }
}
