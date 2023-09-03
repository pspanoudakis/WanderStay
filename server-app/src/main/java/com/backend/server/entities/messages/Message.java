package com.backend.server.entities.messages;

import java.io.IOException;
import java.util.Date;
import com.backend.server.entities.users.User;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonFormat.Shape;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;
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

class MessageSenderSerializer extends StdSerializer<User> {
    public MessageSenderSerializer() {
        this(null);
    }

    public MessageSenderSerializer(Class<User> u) {
        super(u);
    }

    @Override
    public void serialize(
        User user, JsonGenerator jgen, SerializerProvider provider
    ) throws IOException {
        jgen.writeString(user.getUsername());
    }
}

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

    @JsonSerialize(using = MessageSenderSerializer.class)
    @ManyToOne(optional = false)
    private User sentBy;

    @JsonFormat(
        shape = Shape.STRING, pattern = "yyyy-MM-dd HH:mm", timezone = "Europe/Athens"
    )
    @Temporal(TemporalType.TIMESTAMP)
    private Date sentOn;

    @Lob
    private String text;
}
