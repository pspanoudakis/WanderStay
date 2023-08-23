package com.backend.server.controllers.requests;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class ImageSelectionDto {
    private Long imgId;
    private boolean isMain;
}
