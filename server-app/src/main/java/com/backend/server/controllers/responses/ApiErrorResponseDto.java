package com.backend.server.controllers.responses;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ApiErrorResponseDto extends ApiResponseDto {
    private String error;

    public ApiErrorResponseDto(String msg) {
        super(false);
        this.error = msg;
    }

    public ApiErrorResponseDto(Exception e) {
        super(false);
        this.error = e.getMessage();
    }
}
