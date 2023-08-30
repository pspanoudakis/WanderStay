package com.backend.server.controllers.requests;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class ImageSelectionDto {
    private Long imgId;
    @JsonProperty("isMain")
    private boolean isMain;
}
