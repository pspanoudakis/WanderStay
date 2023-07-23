package com.backend.server.controllers.responses;

import com.backend.server.controllers.utils.ApiResponse;
import com.backend.server.entities.user.User;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class AuthResponse extends ApiResponse {

    private User user;

    private String jwt;

    @Builder
    public AuthResponse(User user, String jwt) {
        super(true);
        this.user = user;
        this.jwt = jwt;
    }

}
