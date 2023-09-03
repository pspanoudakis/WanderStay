package com.backend.server.services;

import org.springframework.stereotype.Service;

import com.backend.server.controllers.responses.ApiResponseDto;
import com.backend.server.controllers.responses.ConversationDto;
import com.backend.server.entities.messages.Conversation;
import com.backend.server.entities.properties.Property;
import com.backend.server.exceptions.BadRequestException;
import com.backend.server.repositories.ConversationRepository;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
class ConversationResponseDto extends ApiResponseDto {

    private ConversationDto conversation;

    public ConversationResponseDto(Conversation c) {
        super(true);
        Property property = c.getProperty();
        this.conversation = (
            ConversationDto.builder()
                .id(c.getId())
                .propertyId(property.getId())
                .propertyName(property.getName())
                .hostUsername(property.getHost().getUser().getUsername())
                .guestUsername(c.getGuestUser().getUser().getUsername())
                .messages(c.getMessages())
                .build()
        );
    }
    
}

@Service
@RequiredArgsConstructor
public class ConversationService {
    
    private final ConversationRepository conversationRepository;

    public ConversationResponseDto getOrCreateGuestSideConversation(
        String jwt, Long propertyId
    ) throws BadRequestException {

        return new ConversationResponseDto(null);
    }

    public ConversationResponseDto getHostSideConversation(
        String jwt, Long conversationId
    ) throws BadRequestException {

        return new ConversationResponseDto(null);
    }

    public ApiResponseDto sendMessage(
        String jwt, Long conversationId, String text
    ) throws BadRequestException {

        return new ApiResponseDto(true);
    }

    public ApiResponseDto markConversationAsDeletedByHost(
        String jwt, Long conversationId
    ) throws BadRequestException {

        return new ApiResponseDto(true);
    }

}
