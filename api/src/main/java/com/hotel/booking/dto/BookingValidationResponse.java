package com.hotel.booking.dto;


import lombok.Data;

@Data
public class BookingValidationResponse {
    private boolean exists;
    private String status;       // "booked", "cancelled", ...
    private boolean reviewed;    // true nếu đã đánh giá
}
