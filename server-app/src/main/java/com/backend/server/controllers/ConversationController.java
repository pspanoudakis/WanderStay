package com.backend.server.controllers;

import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.backend.server.controllers.requests.MessageDto;
import com.backend.server.controllers.responses.ApiResponseDto;
import com.backend.server.controllers.utils.ControllerResponseUtils;
import com.backend.server.services.ConversationService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/conversation")
@RequiredArgsConstructor
public class ConversationController {
    
    private final ConversationService conversationService;

    @GetMapping("/guestSide")
    public ResponseEntity<ApiResponseDto> getGuestSideConversation(
        @RequestHeader(HttpHeaders.AUTHORIZATION) String jwt,
        @RequestParam Long propertyId
    ) {
        return ControllerResponseUtils.responseFactory(
            () -> conversationService.getOrCreateGuestSideConversation(jwt, propertyId)
        );
    }

    @GetMapping("/hostSearch")
    public ResponseEntity<?> getAllPropertyConversations(
        @RequestHeader(HttpHeaders.AUTHORIZATION) String jwt,
        @RequestParam Long propertyId,
        @RequestParam Short numPage,
        @RequestParam Byte pageSize
    ) {
        return ControllerResponseUtils.genericResponseFactory(
            () -> conversationService.getAllPropertyConversations(
                jwt, propertyId, numPage, pageSize
            )
        );
    }
    
    @GetMapping("/{conversationId}")
    public ResponseEntity<ApiResponseDto> getHostSideConversation(
        @RequestHeader(HttpHeaders.AUTHORIZATION) String jwt,
        @PathVariable Long conversationId
    ) {
        return ControllerResponseUtils.responseFactory(
            () -> conversationService.getHostSideConversation(jwt, conversationId)
        );
    }

    @PostMapping("/{conversationId}")
    public ResponseEntity<ApiResponseDto> sendMessageToConversation(
        @RequestHeader(HttpHeaders.AUTHORIZATION) String jwt,
        @PathVariable Long conversationId,
        @RequestBody MessageDto request
    ) {
        return ControllerResponseUtils.responseFactory(
            () -> conversationService.sendMessage(jwt, conversationId, request)
        );
    }

    @PostMapping("/{conversationId}/markDeleted")
    public ResponseEntity<ApiResponseDto> markConversationAsDeleted(
        @RequestHeader(HttpHeaders.AUTHORIZATION) String jwt,
        @PathVariable Long conversationId
    ) {
        return ControllerResponseUtils.responseFactory(
            () -> conversationService.markConversationAsDeletedByHost(jwt, conversationId)
        );
    }

}
