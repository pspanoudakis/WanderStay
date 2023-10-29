package com.backend.server.services;

import java.util.Date;

import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import com.backend.server.controllers.requests.MessageDto;
import com.backend.server.controllers.responses.ApiResponseDto;
import com.backend.server.controllers.responses.ConversationDto;
import com.backend.server.controllers.responses.ConversationPreviewDto;
import com.backend.server.entities.messages.Conversation;
import com.backend.server.entities.messages.Message;
import com.backend.server.entities.properties.Property;
import com.backend.server.entities.users.Guest;
import com.backend.server.entities.users.Host;
import com.backend.server.entities.users.User;
import com.backend.server.exceptions.BadRequestException;
import com.backend.server.repositories.ConversationRepository;
import com.backend.server.services.utils.PaginationUtils;
import com.backend.server.specifications.ConversationSpecification;

import jakarta.transaction.Transactional;
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

        // Trigger lazy-loading
        c.getMessages().size();

        this.conversation = (
            ConversationDto.builder()
                .id(c.getId())
                .propertyId(property.getId())
                .propertyName(property.getName())
                .hostUsername(property.getHost().getUser().getUsername())
                .hostImg(property.getHost().getUser().getImage())
                .guestUsername(c.getGuestUser().getUser().getUsername())
                .guestImg(c.getGuestUser().getUser().getImage())
                .messages(c.getMessages())
            .build()
        );
    }
    
}

@Getter
@Setter
class MessageResponseDto extends ApiResponseDto {

    private Message message;

    public MessageResponseDto(Message m) {
        super(true);
        message = m;
    }
    
}

@Service
@RequiredArgsConstructor
public class ConversationService {
    
    private final HostService hostService;
    private final GuestService guestService;
    private final PropertyService propertyService;
    private final ConversationSpecification conversationSpecification;
    private final ConversationRepository conversationRepository;

    private Conversation getConversationByIdOrElseThrow(Long conversationId)
    throws BadRequestException {
        return conversationRepository.findById(conversationId).orElseThrow(
            () -> new BadRequestException(
                "No conversation found with ID: '" + conversationId.toString() + "'"
            )
        );
    }

    private boolean isConversationPropertyHost(User user, Conversation conversation) {
        return (
            conversation.getProperty().getHost().getUser().getUsername().equals(
                user.getUsername()
            )
        );
    }

    private void ensureRelatedOrElseThrow(User user, Conversation conversation)
    throws BadRequestException {
        if (
            !isConversationPropertyHost(user, conversation) &&
            !conversation.getGuestUser().getUser().getUsername().equals(
                user.getUsername()
            )
        ) {
            throw new BadRequestException(
                "The specified User is not related to the specified Conversation."
            );
        }
    }

    @Transactional
    public ConversationResponseDto getOrCreateGuestSideConversation(
        User thisGuestUser, Long propertyId
    ) throws BadRequestException {
        Guest guest = guestService.getGuestOrElseThrow(thisGuestUser);

        return new ConversationResponseDto(
            conversationRepository.findOne(
                conversationSpecification.findByGuestAndPropertyIdSpecification(guest, propertyId)
            ).orElseGet(
                () -> (
                    conversationRepository.save(
                        Conversation.builder()
                            .guestUser(guest)
                            .property(propertyService.getPropertyFromIdOrElseThrow(propertyId))
                        .build()
                    )
                )
            )
        );
    }

    @Transactional
    public ConversationResponseDto getHostSideConversation(
        User thisHostUser, Long conversationId
    ) throws BadRequestException {
        Host host = hostService.getHostOrElseThrow(thisHostUser);        
        Conversation conversation = getConversationByIdOrElseThrow(conversationId);

        if (!isConversationPropertyHost(host.getUser(), conversation)) {
            throw new BadRequestException(
                "The specified Host is not related to the specified Conversation."
            );
        }

        return new ConversationResponseDto(conversation);
    }

    @Transactional
    public ApiResponseDto sendMessage(
        User thisUser, Long conversationId, MessageDto request
    ) throws BadRequestException {
        Conversation conversation = getConversationByIdOrElseThrow(conversationId);
        ensureRelatedOrElseThrow(thisUser, conversation);

        Message message = (
            Message.builder()
                .conversation(conversation)
                .sentBy(thisUser)
                .sentOn(new Date())
                .text(request.getText())
            .build()
        );
        conversation.getMessages().add(message);
        conversation.setDeletedByHost(false);
        conversationRepository.save(conversation);

        return new MessageResponseDto(message);
    }

    @Transactional
    public ApiResponseDto markConversationAsDeletedByHost(
        User thisHostUser, Long conversationId
    ) throws BadRequestException {
        Host host = hostService.getHostOrElseThrow(thisHostUser);
        Conversation conversation = getConversationByIdOrElseThrow(conversationId);
        if (!isConversationPropertyHost(host.getUser(), conversation)) {
            throw new BadRequestException(
                "The specified Host is not related to the specified Conversation."
            );
        }

        conversation.setDeletedByHost(true);
        conversationRepository.save(conversation);

        return new ApiResponseDto(true);
    }

    @Transactional
    public Page<ConversationPreviewDto> getAllPropertyConversations(
        User thisHostUser, Long propertyId,
        Short numPage, Byte pageSize
    ) throws BadRequestException {
        Host host = hostService.getHostOrElseThrow(thisHostUser);
        Property property = propertyService.getPropertyFromIdOrElseThrow(propertyId);
        propertyService.throwIfNotOwner(host, property);

        return conversationRepository.getPropertyConversations(
            propertyId, PaginationUtils.getPageable(numPage, pageSize)
        )
        .map(c -> (
                ConversationPreviewDto.builder()
                    .guestUsername(c.getGuestUser().getUser().getUsername())
                    .guestImg(c.getGuestUser().getUser().getImage())
                    .lastMessage(
                        c.getMessages().size() > 0 ? 
                        c.getMessages().get(c.getMessages().size() - 1) : null
                    )
                    .id(c.getId())
                .build()
            )
        );
    }

}
