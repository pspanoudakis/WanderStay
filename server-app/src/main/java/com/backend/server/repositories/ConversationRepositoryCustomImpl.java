package com.backend.server.repositories;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import com.backend.server.entities.messages.Conversation;
import com.backend.server.entities.messages.Conversation_;
import com.backend.server.entities.messages.Message_;
import com.backend.server.entities.properties.Property_;

import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Root;

public class ConversationRepositoryCustomImpl implements ConversationRepositoryCustom {

    @Autowired
    private EntityManager entityManager;

    private void prepareConversationCriteriaQuery(
        Long propertyId, 
        CriteriaQuery<?> criteriaQuery, 
        Root<Conversation> conversationRoot
    ) {
        CriteriaBuilder builder = entityManager.getCriteriaBuilder();
        
        criteriaQuery
            .groupBy(
                conversationRoot.get(Conversation_.id)
            )
            .where(
                builder.and(
                    builder.equal(
                        conversationRoot.join(Conversation_.property).get(Property_.id),
                        propertyId
                    ),
                    builder.equal(
                        conversationRoot.get(Conversation_.deletedByHost),
                        false
                    )
                )
            );
    }

    private Long getCountQueryResult(Long propertyId) {
        CriteriaBuilder builder = entityManager.getCriteriaBuilder();
        var criteriaQuery = builder.createQuery(Long.class);
        var conversationRoot = criteriaQuery.from(Conversation.class);
        conversationRoot.join(Conversation_.messages);
        prepareConversationCriteriaQuery(
            propertyId, 
            criteriaQuery, 
            conversationRoot            
        );
        criteriaQuery
            .select(builder.countDistinct(conversationRoot));
        
        List<Long> counts = entityManager.createQuery(criteriaQuery).getResultList();
        return counts.stream().reduce((long)0, Long::sum);
    }

    @Override
    public Page<Conversation> getPropertyConversations(Long propertyId, Pageable pageable) {
        CriteriaBuilder builder = entityManager.getCriteriaBuilder();
        var criteriaQuery = builder.createQuery(Conversation.class);
        var conversationRoot = criteriaQuery.from(Conversation.class);
        var messagesJoin = conversationRoot.join(Conversation_.messages);
        prepareConversationCriteriaQuery(
            propertyId, 
            criteriaQuery, 
            conversationRoot
        );
        
        criteriaQuery
            .select(conversationRoot)
            .orderBy(
                builder.desc(
                    builder.greatest(
                        messagesJoin.get(Message_.sentOn)
                    )
                )
            );

        TypedQuery<Conversation> query = entityManager.createQuery(criteriaQuery);
        query.setMaxResults(pageable.getPageSize());
        query.setFirstResult((int)pageable.getOffset());

        return new PageImpl<Conversation>(
            query.getResultList(), 
            pageable,
            getCountQueryResult(propertyId)
        );
    }
    
}
