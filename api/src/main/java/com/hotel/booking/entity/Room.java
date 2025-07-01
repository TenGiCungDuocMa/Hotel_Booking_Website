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
    private String img;
    private Double pricePerNight;
    private Integer capacity;
    private String description;
    private Boolean isAvailable;
    private String imgs;
    private String features;

    public String getImgs() { return imgs; }
    public void setImgs(String imgs) { this.imgs = imgs; }
    public String getFeatures() { return features; }
    public void setFeatures(String features) { this.features = features; }
}