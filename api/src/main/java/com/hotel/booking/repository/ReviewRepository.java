package com.hotel.booking.repository;

import com.hotel.booking.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ReviewRepository extends JpaRepository<Review, Integer> {
    Optional<Review> findByBookingId(Integer bookingId);
    List<Review> findByIsSpamTrue();
    boolean existsByBookingId(Integer bookingId);

}

