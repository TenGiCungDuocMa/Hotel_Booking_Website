package com.hotel.booking.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class BookingUpdateRequest {
    private LocalDate checkInDate;
    private LocalDate checkOutDate;
    private String status; // optional: Booked, Canceled, etc.
}
