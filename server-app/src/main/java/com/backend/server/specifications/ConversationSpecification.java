package com.backend.server.specifications;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.backend.server.entities.messages.Conversation;
import com.backend.server.entities.messages.Conversation_;
import com.backend.server.entities.properties.Property_;
import com.backend.server.entities.users.Guest;
import com.backend.server.entities.users.Guest_;
import com.backend.server.entities.users.User_;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ConversationSpecification {
    
    public Specification<Conversation> 
    findByGuestAndPropertyIdSpecification(Guest guest, Long propertyId) {
        return (conversationRoot, conversationQuery, criteriaBuilder) -> {
            return criteriaBuilder.and(
                criteriaBuilder.equal(
                    conversationRoot.join(Conversation_.property).get(Property_.id),
                    propertyId
                ),
                criteriaBuilder.equal(
                    conversationRoot.join(Conversation_.guestUser).join(Guest_.user).get(User_.username),
                    guest.getUser().getUsername()
                )
            );
        };
    }
    
}
