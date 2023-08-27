package com.backend.server.controllers.utils;

import org.springframework.util.function.ThrowingSupplier;

import com.backend.server.controllers.responses.ApiErrorResponseDto;
import com.backend.server.controllers.responses.ApiResponseDto;
import com.backend.server.controllers.responses.AuthResponseDto;
import com.backend.server.exceptions.BadRequestException;

import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;

public final class ControllerResponseUtils {

    public static ResponseEntity<ApiResponseDto> responseFactory(ApiResponseDto res) {
        if (res.isOk()) {
            return ResponseEntity.ok(res);
        } else {
            return ResponseEntity.badRequest().body(res);
        }
    }

    public static ResponseEntity<ApiResponseDto> errorResponseFactory(Exception e) {
        return ControllerResponseUtils.responseFactory(
            new ApiErrorResponseDto(e)
        );
    }

    public static ResponseEntity<ApiResponseDto> responseFactory(ThrowingSupplier<ApiResponseDto> fn) {
        try {
            ApiResponseDto res = fn.get();
            return ControllerResponseUtils.responseFactory(res);
        } catch (BadRequestException e) {
            return errorResponseFactory(e);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(
                new ApiErrorResponseDto(e)
            );
        }
    }

    public static ResponseEntity<ApiResponseDto> authResponseFactory(ThrowingSupplier<AuthResponseDto> fn) {
        try {
            AuthResponseDto res = fn.get();
            return (
                ResponseEntity
                    .ok()
                    .header(HttpHeaders.AUTHORIZATION, res.getJwt())
                    .body(res)
            );
        } catch (BadRequestException e) {
            return errorResponseFactory(e);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(
                new ApiErrorResponseDto(e)
            );
        }
    }

    public static <T> ResponseEntity<?> genericResponseFactory(ThrowingSupplier<T> fn) {
        try {
            T res = fn.get();
            return ResponseEntity.ok().body(res);
        } catch (BadRequestException e) {
            return errorResponseFactory(e);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(
                new ApiErrorResponseDto(e)
            );
        }
    }
}
