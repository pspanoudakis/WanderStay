package com.backend.server.entities.properties;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonFormat.Shape;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
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
@Table(name = "_available_time_slot")
public class AvailableTimeSlot {
    @JsonIgnore
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonFormat(
        shape = Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Europe/Athens"
    )
    @Temporal(TemporalType.DATE)
    @Column(nullable = false)
    private Date startDate;

    @JsonFormat(
        shape = Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Europe/Athens"
    )
    @Temporal(TemporalType.DATE)
    @Column(nullable = false)
    private Date endDate;

    @JsonIgnore
    @ManyToOne(optional = false)
    @JoinColumn(name = "property_id")
    private Property property;
}
