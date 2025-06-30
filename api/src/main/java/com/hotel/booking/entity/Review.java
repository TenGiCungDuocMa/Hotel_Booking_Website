package com.hotel.booking.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Table(name = "review")
@Data
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private Integer userId;

    private Integer bookingId;

    private Integer rating;

    @Column(columnDefinition = "TEXT")
    private String comment;

    private Boolean isSpam = false;

    private String sentiment;

    private Float confidenceScore;

    private String language;

    private LocalDateTime createdAt = LocalDateTime.now();
}
