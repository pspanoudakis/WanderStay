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
import com.backend.server.services.utils.PageableRetriever;
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
                .guestUsername(c.getGuestUser().getUser().getUsername())
                .messages(c.getMessages())
            .build()
        );
    }
    
}

@Service
@RequiredArgsConstructor
public class ConversationService {
    
    private final AuthService authService;
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
        String jwt, Long propertyId
    ) throws BadRequestException {
        Guest guest = guestService.getGuestFromTokenOrElseThrow(jwt);

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
        String jwt, Long conversationId
    ) throws BadRequestException {
        Host host = hostService.getHostFromTokenOrElseThrow(jwt);        
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
        String jwt, Long conversationId, MessageDto request
    ) throws BadRequestException {
        User user = authService.getUserFromTokenOrElseThrow(jwt);
        Conversation conversation = getConversationByIdOrElseThrow(conversationId);
        ensureRelatedOrElseThrow(user, conversation);

        conversation.getMessages().add(
            Message.builder()
                .conversation(conversation)
                .sentBy(user)
                .sentOn(new Date())
                .text(request.getText())
            .build()
        );
        conversationRepository.save(conversation);

        return new ApiResponseDto(true);
    }

    @Transactional
    public ApiResponseDto markConversationAsDeletedByHost(
        String jwt, Long conversationId
    ) throws BadRequestException {
        Host host = hostService.getHostFromTokenOrElseThrow(jwt);
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
        String jwt, Long propertyId,
        Short numPage, Byte pageSize
    ) throws BadRequestException {
        Host host = hostService.getHostFromTokenOrElseThrow(jwt);
        Property property = propertyService.getPropertyFromIdOrElseThrow(propertyId);
        propertyService.throwIfNotOwner(host, property);

        return conversationRepository.findAll(
            conversationSpecification.findAllPropertyConversationsSpecification(propertyId),
            PageableRetriever.getPageable(numPage, pageSize)
        ).map(c -> (
                ConversationPreviewDto.builder()
                    .guestUsername(c.getGuestUser().getUser().getUsername())
                    .lastMessage(
                        c.getMessages().size() > 0 ? c.getMessages().get(0) : null
                    )
                    .id(c.getId())
                .build()
            )
        );
    }

}
