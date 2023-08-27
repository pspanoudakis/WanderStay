package com.backend.server.controllers.responses;

import com.backend.server.entities.users.User;
import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class AuthResponseDto extends ApiResponseDto {

    private User user;
    @JsonIgnore
    private String jwt;

    @Builder
    public AuthResponseDto(User user, String jwt) {
        super(true);
        this.user = user;
        this.jwt = jwt;
    }

}
