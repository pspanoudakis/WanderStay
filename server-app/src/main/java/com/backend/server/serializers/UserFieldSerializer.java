package com.backend.server.serializers;

import java.io.IOException;

import com.backend.server.entities.users.User;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;

public class UserFieldSerializer extends StdSerializer<User> {
    public UserFieldSerializer() {
        this(null);
    }

    public UserFieldSerializer(Class<User> u) {
        super(u);
    }

    @Override
    public void serialize(
        User user, JsonGenerator jgen, SerializerProvider provider
    ) throws IOException {
        jgen.writeString(user.getUsername());
    }
}
