package com.hotel.booking.dto;

import lombok.Data;

@Data
public class ReviewRequest {
    private Integer bookingId;
    private Integer rating;
    private String comment;
}