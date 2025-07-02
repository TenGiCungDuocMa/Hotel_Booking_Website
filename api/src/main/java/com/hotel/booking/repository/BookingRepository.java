package com.hotel.booking.repository;

import com.hotel.booking.dto.BookingResponse;
import com.hotel.booking.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface BookingRepository extends JpaRepository<Booking, Integer> {
    List<Booking> findByUserId(Integer userId);
    Optional<Booking> findByBookingIdAndUserId(Integer bookingId, Integer userId);
    Optional<Booking> findByBookingId(Integer bookingId);
    @Query("""
    SELECT new com.hotel.booking.dto.BookingResponse(
        b.bookingId,
        r.roomId,
        r.roomNumber,
        b.checkInDate,
        b.checkOutDate,
        b.status,
        h.name,
        h.address,
        h.imgs,
        r.imgs,
        b.request,
        b.madonhang
    )
    FROM Booking b
    JOIN Room r ON b.roomId = r.roomId
    JOIN Hotel h ON r.hotelId = h.hotelId
    WHERE b.userId = :userId
    ORDER BY b.checkInDate DESC
""")
    List<BookingResponse> findBookingHistoryByUserId(Integer userId);

}
