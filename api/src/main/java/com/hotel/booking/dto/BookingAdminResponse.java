package com.hotel.booking.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookingAdminResponse {
    private Integer bookingId;
    private String madonhang;
    private Integer userId;
    private String fullName;
    private String email;
    private String phone;
    private String roomNumber;
    private String hotelName;
    private LocalDate checkInDate;
    private LocalDate checkOutDate;
    private String status;
    private String request;
}
