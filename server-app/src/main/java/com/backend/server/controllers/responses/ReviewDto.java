package com.backend.server.controllers.responses;

import java.util.Date;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class ReviewDto {
    private String guestUsername;
    private Date createdOn;
    private Byte stars;
    private String text;
}
