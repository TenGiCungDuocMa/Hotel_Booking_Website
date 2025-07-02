package com.hotel.booking.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class AvailableRoomRequest {
    private Integer capacity;
    private LocalDate checkInDate;
    private LocalDate checkOutDate;
}
