package com.hotel.booking.controller;

import com.hotel.booking.dto.BookingAdminResponse;
import com.hotel.booking.service.BookingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/bookings")
@RequiredArgsConstructor
public class BookingAdminController {

    private final BookingService bookingService;

    @GetMapping()
    public ResponseEntity<List<BookingAdminResponse>> getAllBookings() {
        return ResponseEntity.ok(bookingService.getAllBookings());
    }

//    @PutMapping("/{id}/approve")
//    public ResponseEntity<?> approve(@PathVariable Integer id) {
//        bookingService.approveBooking(id);
//        return ResponseEntity.ok().build();
//    }
//
//    @PutMapping("/{id}/reject")
//    public ResponseEntity<?> reject(@PathVariable Integer id) {
//        bookingService.rejectBooking(id);
//        return ResponseEntity.ok().build();
//    }
}
