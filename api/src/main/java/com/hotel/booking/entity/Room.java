package com.hotel.booking.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "rooms")
@Data
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer roomId;
    private Integer hotelId;
    private String roomNumber;
    private Double pricePerNight;
    private Integer capacity;
    private String description;
    private Boolean isAvailable;
}