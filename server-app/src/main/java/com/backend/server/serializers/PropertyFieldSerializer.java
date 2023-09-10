package com.backend.server.serializers;

import java.io.IOException;

import com.backend.server.entities.properties.Property;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;

public class PropertyFieldSerializer extends StdSerializer<Property> {

    public PropertyFieldSerializer() {
        this(null);
    }

    public PropertyFieldSerializer(Class<Property> t) {
        super(t);
    }

    @Override
    public void serialize(
        Property property, JsonGenerator jgen, SerializerProvider provider
    ) throws IOException {
        jgen.writeNumber(property.getId());
    }
    
}
