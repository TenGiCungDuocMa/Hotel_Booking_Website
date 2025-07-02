package com.hotel.booking.dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class BookingResponse {
    private Integer bookingId;
    private Integer roomId;
    private LocalDate checkInDate;
    private LocalDate checkOutDate;
    private String status;
    private String hotelName;
    private String hotelAddress;
    private String hotelImgs;
    private String roomImgs;
    private String request;
    private String madonhang;
//    private String roomNumber;
}