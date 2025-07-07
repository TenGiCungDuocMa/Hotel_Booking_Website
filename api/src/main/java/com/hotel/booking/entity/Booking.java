package com.hotel.booking.entity;

import jakarta.persistence.*;
import jakarta.persistence.criteria.CriteriaBuilder;
import lombok.Data;
import java.time.LocalDate;
import java.time.LocalDateTime;

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
    private LocalDateTime createdAt;
    private Integer hotelId;
    private String request;
    private String madonhang;
    private Integer aiPrediction;  // 1: sẽ hủy, 0: sẽ giữ
    private Double aiConfidence;   // xác suất

}