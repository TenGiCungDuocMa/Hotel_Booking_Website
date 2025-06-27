package com.hotel.booking.dto;


import lombok.Data;

@Data
public class ProfileResponse {
    private String fullName;
    private String email;
    private String phone;
    private String role;
}

