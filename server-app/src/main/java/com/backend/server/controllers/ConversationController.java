package com.backend.server.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.server.services.ConversationService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/conversation")
@RequiredArgsConstructor
public class ConversationController {
    
    private final ConversationService conversationService;

}
