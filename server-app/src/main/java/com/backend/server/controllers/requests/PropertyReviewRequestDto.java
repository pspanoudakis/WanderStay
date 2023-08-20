package com.backend.server.controllers.requests;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PropertyReviewRequestDto {
    private Byte stars;
    private String text;
}
