package com.backend.server.entities.users;

import com.backend.server.serializers.UserFieldSerializer;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import jakarta.persistence.CascadeType;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.MapsId;
import jakarta.persistence.OneToOne;
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
@Table(name= "_admin")
public class Admin {

    @JsonIgnore
    @EmbeddedId
    private RoleEntityId id;

    @JsonSerialize(using = UserFieldSerializer.class)
    @MapsId("username")
    @OneToOne(optional = false, cascade = {CascadeType.ALL})
    @JoinColumn(nullable = false, name = "username")
    private User user;
}
