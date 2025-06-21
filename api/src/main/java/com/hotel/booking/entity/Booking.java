package com.hotel.booking.entity;

import jakarta.persistence.*;
import jakarta.persistence.criteria.CriteriaBuilder;
import lombok.Data;
import java.time.LocalDate;

@Entity
@Table(name = "bookings")
@Data
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer bookingId;
    private Integer userId;
    private Integer roomId;
    private LocalDate checkInDate;
    private LocalDate checkOutDate;
    private String status;
    private LocalDate createdAt;
    private Integer hotelId;
}