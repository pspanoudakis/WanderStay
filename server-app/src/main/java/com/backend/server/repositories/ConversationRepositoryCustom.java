package com.backend.server.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.backend.server.entities.messages.Conversation;

public interface ConversationRepositoryCustom {
    Page<Conversation> getPropertyConversations(Long propertyId, Pageable pageable);
}
