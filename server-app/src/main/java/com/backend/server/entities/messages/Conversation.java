package com.backend.server.entities.messages;

import java.util.LinkedList;
import java.util.List;

import com.backend.server.entities.properties.Property;
import com.backend.server.entities.users.Guest;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "_conversation")
public class Conversation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    private Guest guestUser;

    @ManyToOne(optional = false)
    private Property property;

    @Builder.Default
    private boolean deletedByHost = false;

    @OneToMany(
        cascade = {CascadeType.ALL},
        mappedBy = "conversation"
    )
    @Builder.Default
    private List<Message> messages = new LinkedList<Message>();
}
