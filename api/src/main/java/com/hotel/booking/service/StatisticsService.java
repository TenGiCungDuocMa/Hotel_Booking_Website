package com.hotel.booking.service;

import com.hotel.booking.dto.StatisticsResponse;
import com.hotel.booking.repository.BookingRepository;
import com.hotel.booking.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class StatisticsService {

    private final BookingRepository bookingRepository;
    private final ReviewRepository reviewRepository;

    public StatisticsResponse getStatistics() {
        long totalBookings = bookingRepository.countAllBookings();
        Double revenue = bookingRepository.calculateTotalRevenue();
        long positive = reviewRepository.countPositiveReviews();
        long negative = reviewRepository.countNegativeReviews();

        return new StatisticsResponse(
                totalBookings,
                revenue != null ? revenue : 0,
                positive,
                negative
        );
    }
}
