package com.backend.server.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.backend.server.config.ConversationSocketConfiguration;
import com.backend.server.controllers.requests.MessageDto;
import com.backend.server.controllers.responses.ApiResponseDto;
import com.backend.server.controllers.utils.ControllerResponseUtils;
import com.backend.server.entities.users.User;
import com.backend.server.services.ConversationService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/conversation")
@RequiredArgsConstructor
public class ConversationController {
    
    private final ConversationService conversationService;

    @Autowired
    SimpMessagingTemplate messagingTemplate;

    @GetMapping("/guestSide")
    public ResponseEntity<ApiResponseDto> getGuestSideConversation(
        @AuthenticationPrincipal User thisUser,
        @RequestParam Long propertyId
    ) {
        return ControllerResponseUtils.responseFactory(
            () -> conversationService.getOrCreateGuestSideConversation(thisUser, propertyId)
        );
    }

    @GetMapping("/hostSearch")
    public ResponseEntity<?> getAllPropertyConversations(
        @AuthenticationPrincipal User thisUser,
        @RequestParam Long propertyId,
        @RequestParam Short numPage,
        @RequestParam Byte pageSize
    ) {
        return ControllerResponseUtils.genericResponseFactory(
            () -> conversationService.getAllPropertyConversations(
                thisUser, propertyId, numPage, pageSize
            )
        );
    }
    
    @GetMapping("/{conversationId}")
    public ResponseEntity<ApiResponseDto> getHostSideConversation(
        @AuthenticationPrincipal User thisUser,
        @PathVariable Long conversationId
    ) {
        return ControllerResponseUtils.responseFactory(
            () -> conversationService.getHostSideConversation(thisUser, conversationId)
        );
    }

    @PostMapping("/{conversationId}")
    public ResponseEntity<ApiResponseDto> sendMessageToConversation(
        @AuthenticationPrincipal User thisUser,
        @PathVariable Long conversationId,
        @RequestBody MessageDto request
    ) {

        ResponseEntity<ApiResponseDto> response = 
            ControllerResponseUtils.responseFactory(
                () -> conversationService.sendMessage(thisUser, conversationId, request)
            );
        if (response.getStatusCode() == HttpStatus.OK) {
            messagingTemplate.convertAndSend(
                ConversationSocketConfiguration.CHAT_BROKER_PREFIX + conversationId.toString(), 
                response.getBody()
            );
        }
        return response;
    }

    @PostMapping("/{conversationId}/markDeleted")
    public ResponseEntity<ApiResponseDto> markConversationAsDeleted(
        @AuthenticationPrincipal User thisUser,
        @PathVariable Long conversationId
    ) {
        return ControllerResponseUtils.responseFactory(
            () -> conversationService.markConversationAsDeletedByHost(thisUser, conversationId)
        );
    }

}
