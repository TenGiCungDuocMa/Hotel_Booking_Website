package com.hotel.booking.controller;

import com.hotel.booking.dto.AvailableRoomRequest;
import com.hotel.booking.entity.Room;
import com.hotel.booking.service.RoomService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rooms")
public class RoomController {

    private final RoomService roomService;

    public RoomController(RoomService roomService) {
        this.roomService = roomService;
    }

    @PostMapping("/available")
    public List<Room> getAvailableRooms(@RequestBody AvailableRoomRequest request) {
        int defaultHotelId = 1;
        return roomService.getAvailableRooms(
                defaultHotelId,
                request.getCapacity(),
                request.getCheckInDate(),
                request.getCheckOutDate()
        );
    }
}

