package com.backend.server.controllers;

import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import com.backend.server.config.WebSocketConfiguration;
import com.backend.server.controllers.responses.ApiResponseDto;

@Controller
public class ChatSocketController {
    @SendTo(WebSocketConfiguration.CHAT_BROKER_PREFIX + "{conversationId}")
    public ApiResponseDto broadcastSentMessage(@Payload ApiResponseDto sentMessageDto) {
        return sentMessageDto;
    }
}
