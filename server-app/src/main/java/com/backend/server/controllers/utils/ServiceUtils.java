package com.backend.server.controllers.utils;

public final class ServiceUtils {
    public static ApiErrorResponse createErrorResponse(Exception e) {
        return new ApiErrorResponse(e.getMessage());
    }
}
