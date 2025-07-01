package com.hotel.booking.repository;

import com.hotel.booking.entity.Room;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface RoomRepository extends JpaRepository<Room, Integer> {

    @Query("""
        SELECT r FROM Room r
        WHERE r.hotelId = :hotelId
          AND r.isAvailable = true
          AND r.capacity >= :capacity
          AND r.roomId NOT IN (
              SELECT b.roomId FROM Booking b
              WHERE b.hotelId = :hotelId
                AND b.status <> 'CANCELLED'
                AND (
                    (:checkInDate BETWEEN b.checkInDate AND b.checkOutDate) OR
                    (:checkOutDate BETWEEN b.checkInDate AND b.checkOutDate) OR
                    (b.checkInDate BETWEEN :checkInDate AND :checkOutDate)
                )
          )
    """)
    List<Room> findAvailableRooms(
            @Param("hotelId") Integer hotelId,
            @Param("capacity") Integer capacity,
            @Param("checkInDate") LocalDate checkInDate,
            @Param("checkOutDate") LocalDate checkOutDate
    );
}
