package com.hotel.booking.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class StatisticsResponse {
    private long totalBookings;
    private double totalRevenue;
    private long positiveReviews;
    private long negativeReviews;
}
