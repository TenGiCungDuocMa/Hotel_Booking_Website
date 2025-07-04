package com.hotel.booking.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookingResponse {
    private Integer bookingId;
    private Integer roomId;
    private String roomNumber;
    private LocalDate checkInDate;
    private LocalDate checkOutDate;
    private String status;
    private String hotelName;
    private String hotelAddress;
    private String hotelImgs;
    private String roomImgs;
    private String request;
    private String madonhang;
    private String userFullName;
    private String userPhone;
}
