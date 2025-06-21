package com.hotel.booking.controller;

import com.hotel.booking.dto.BookingResponse;
import com.hotel.booking.dto.BookingUpdateRequest;
import com.hotel.booking.service.BookingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@RequiredArgsConstructor
public class BookingController {

    private final BookingService bookingService;

    @GetMapping
    public ResponseEntity<List<BookingResponse>> getBookings(Authentication authentication) {
        return ResponseEntity.ok(bookingService.getUserBookings(authentication));
    }
//    @DeleteMapping("/{bookingId}")
//    public ResponseEntity<?> cancelBooking(@PathVariable Integer bookingId, Authentication authentication) {
//        bookingService.cancelBooking(bookingId, authentication);
//        return ResponseEntity.ok("Booking cancelled successfully");
//    }

    @PutMapping("/{bookingId}")
    public ResponseEntity<BookingResponse> updateBooking(
            @PathVariable Integer bookingId,
            @RequestBody BookingUpdateRequest request,
            Authentication authentication
    ) {
        return ResponseEntity.ok(bookingService.updateBooking(bookingId, request, authentication));
    }
}
