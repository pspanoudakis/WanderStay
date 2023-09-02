package com.backend.server.controllers.responses;

import com.backend.server.entities.users.User;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserResponseDto extends ApiResponseDto{
    private User user;

    @Builder
    public UserResponseDto(User user) {
        super(true);
        this.user = user;
    }
}
