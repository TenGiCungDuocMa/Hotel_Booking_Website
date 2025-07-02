package com.hotel.booking.service;

import com.hotel.booking.entity.Room;
import com.hotel.booking.repository.RoomRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class RoomService {

    private final RoomRepository roomRepository;

    public RoomService(RoomRepository roomRepository) {
        this.roomRepository = roomRepository;
    }

    public List<Room> getAvailableRooms(Integer hotelId, Integer capacity, LocalDate checkIn, LocalDate checkOut) {
        return roomRepository.findAvailableRooms(hotelId, capacity, checkIn, checkOut);
    }
}
