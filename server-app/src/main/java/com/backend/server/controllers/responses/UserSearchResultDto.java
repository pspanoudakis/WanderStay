package com.backend.server.controllers.responses;

import java.util.List;

import com.backend.server.entities.users.Role;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class UserSearchResultDto {
    private String username;
    private Boolean isActive;
    private List<Role> roles;
}
