package com.backend.server.entities.users;

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
@Table(name= "_guests")
public class Guest {

    @EmbeddedId
    private RoleEntityId id;

    @MapsId("username")
    @OneToOne(optional = false, cascade = {CascadeType.ALL})
    @JoinColumn(nullable = false, name = "username")
    private User user;
}
