package com.backend.server.controllers.utils;

import org.springframework.util.function.ThrowingSupplier;

import com.backend.server.controllers.responses.ApiErrorResponseDto;
import com.backend.server.controllers.responses.ApiResponseDto;
import com.backend.server.exceptions.BadRequestException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public final class ControllerUtils {

    public static ResponseEntity<ApiResponseDto> responseFactory(ApiResponseDto res) {
        if (res.isOk()) {
            return ResponseEntity.ok(res);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(res);
        }
    }

    public static ResponseEntity<ApiResponseDto> responseFactory(ThrowingSupplier<ApiResponseDto> fn) {
        try {
            ApiResponseDto res = fn.get();
            return ControllerUtils.responseFactory(res);
        } catch (BadRequestException e) {
            return ControllerUtils.responseFactory(
                new ApiErrorResponseDto(e)
            );
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                new ApiErrorResponseDto(e)
            );
        }
    }
}
