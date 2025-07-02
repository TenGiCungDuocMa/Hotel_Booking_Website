package com.hotel.booking.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ReviewResponse {
    private String userName;
    private String roomNumber;
    private Integer capacity;
    private Integer rating;
    private String comment;
    private boolean isSpam;
    private String sentiment;
    private Float confidenceScore;
    private LocalDateTime createdAt;
}
