package com.backend.server.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.backend.server.entities.messages.Conversation;

public interface ConversationRepository 
extends 
    JpaRepository<Conversation, Long>, 
    JpaSpecificationExecutor<Conversation>, 
    ConversationRepositoryCustom 
{}
