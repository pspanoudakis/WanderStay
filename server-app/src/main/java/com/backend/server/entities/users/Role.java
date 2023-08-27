package com.backend.server.entities.users;

import java.io.IOException;

import org.springframework.security.core.GrantedAuthority;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

class RoleSerializer extends StdSerializer<Role> {
    public RoleSerializer() {
        this(null);
    }

    public RoleSerializer(Class<Role> r) {
        super(r);
    }

    @Override
    public void serialize(
        Role role, JsonGenerator jgen, SerializerProvider provider
    ) throws IOException {
        jgen.writeString(role.getName());
    }
}

@JsonSerialize(using = RoleSerializer.class)
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "_role")
public class Role implements GrantedAuthority{
    @Id
    private String name;

    @JsonIgnore
    @Override
    public String getAuthority() {
        return this.name;
    }    
}
