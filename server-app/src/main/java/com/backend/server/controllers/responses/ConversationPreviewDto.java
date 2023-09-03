package com.backend.server.controllers.responses;

import com.backend.server.entities.messages.Message;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class ConversationPreviewDto {
    private Long id;
    private String guestUsername;
    private Message lastMessage;
}
