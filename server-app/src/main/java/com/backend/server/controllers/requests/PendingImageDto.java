package com.backend.server.controllers.requests;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PendingImageDto {
    private Long existingId;
    private boolean isMain;
    private byte[] bytes;
}
