package com.backend.server.controllers.responses;

import java.util.List;

import com.backend.server.entities.messages.Message;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class ConversationDto {
    private Long id;
    private Long propertyId;
    private String propertyName;
    private String hostUsername;
    private String guestUsername;
    
    private List<Message> messages;
}
