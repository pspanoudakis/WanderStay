package com.backend.server.controllers.utils;

import org.springframework.util.function.ThrowingSupplier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public final class ControllerUtils {

    public static ResponseEntity<ApiResponse> responseFactory(ApiResponse res) {
        if (res.isOk()) {
            return ResponseEntity.ok(res);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(res);
        }
    }

    public static ResponseEntity<ApiResponse> responseFactory(ThrowingSupplier<ApiResponse> fn) {
        try {
            ApiResponse res = fn.get();
            return ControllerUtils.responseFactory(res);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                new ApiErrorResponse(e.getMessage())
            );
        }
    }
}
