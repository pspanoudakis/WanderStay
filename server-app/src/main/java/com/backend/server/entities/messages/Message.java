package com.backend.server.entities.messages;

import java.util.Date;
import com.backend.server.entities.users.User;
import com.backend.server.serializers.UserFieldSerializer;
import com.backend.server.utils.DateUtils.JsonFormatLocalDateTime;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "_message")
public class Message {
    @JsonIgnore
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonIgnore
    @ManyToOne(optional = false)
    private Conversation conversation;

    @JsonSerialize(using = UserFieldSerializer.class)
    @ManyToOne(optional = false)
    private User sentBy;

    @JsonFormatLocalDateTime
    @Temporal(TemporalType.TIMESTAMP)
    private Date sentOn;

    @Lob
    private String text;
}
