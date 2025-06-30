// Hotel.java
package com.hotel.booking.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "hotels")
@Data
public class Hotel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer hotelId;
    private String name;
    private String address;
    private String img;
    private String description;
    private Double latitude;
    private Double longitude;
    private String imgs;

    public String getImgs() { return imgs; }
    public void setImgs(String imgs) { this.imgs = imgs; }
}