package com.backend.server.entities.properties;

import java.util.Date;

import com.backend.server.entities.users.Guest;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "_review")
public class Review {
    @JsonIgnore
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    private Guest guest;

    @JsonIgnore
    @ManyToOne(
        optional = false, 
        fetch = FetchType.LAZY
    )
    private Property property;
    
    @Min(1)
    @Max(5)
    @Column(nullable = false)
    private byte stars;

    @Lob
    private String text;

    @Temporal(TemporalType.DATE)
    private Date createdOn;
}
