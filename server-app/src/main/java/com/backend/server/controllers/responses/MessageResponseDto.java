package com.backend.server.controllers.responses;

import com.backend.server.entities.messages.Message;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MessageResponseDto extends ApiResponseDto {

    private Message message;

    public MessageResponseDto(Message m) {
        super(true);
        message = m;
    }
    
}
