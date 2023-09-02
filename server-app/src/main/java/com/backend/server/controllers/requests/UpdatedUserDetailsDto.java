package com.backend.server.controllers.requests;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdatedUserDetailsDto {
    private String firstName;
    private String lastName;
    private String email;
    private String mobileNumber;

    private List<String> roles;
}
