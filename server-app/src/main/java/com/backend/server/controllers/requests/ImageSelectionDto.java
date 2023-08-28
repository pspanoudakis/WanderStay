package com.backend.server.controllers.requests;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ImageSelectionDto {
    private Long imgId;
    private boolean isMain;
}
