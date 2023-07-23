package com.backend.server.controllers.utils;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ApiErrorResponse extends ApiResponse {
    private String error;

    public ApiErrorResponse(String msg) {
        super(false);
        this.error = msg;
    }
}
