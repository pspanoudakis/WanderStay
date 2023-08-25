package com.backend.server.entities.users;

import org.springframework.security.core.GrantedAuthority;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
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
