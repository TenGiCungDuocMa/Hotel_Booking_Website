package com.hotel.booking.controller;

import com.hotel.booking.dto.BookingResponse;
import com.hotel.booking.dto.BookingUpdateRequest;
import com.hotel.booking.service.BookingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import com.hotel.booking.entity.Hotel;
import com.hotel.booking.entity.Room;
import com.hotel.booking.repository.HotelRepository;
import com.hotel.booking.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;
import java.util.Optional;
import java.util.Map;
import com.hotel.booking.entity.User;
import com.hotel.booking.repository.UserRepository;
import java.time.LocalDate;

@RestController
@RequestMapping("/api/bookings")
@RequiredArgsConstructor
public class BookingController {

    private final BookingService bookingService;
    @Autowired
    private HotelRepository hotelRepository;
    @Autowired
    private RoomRepository roomRepository;
    @Autowired
    private UserRepository userRepository;

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

    // 1. Get a specific hotel by id
    @GetMapping("/hotels/{hotelId}")
    public ResponseEntity<Hotel> getHotelById(@PathVariable Integer hotelId) {
        return hotelRepository.findById(hotelId)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // 2. List rooms for a hotel (optionally filter by date)
    @GetMapping("/hotels/{hotelId}/rooms")
    public ResponseEntity<List<Room>> getRoomsByHotel(@PathVariable Integer hotelId) {
        List<Room> rooms = roomRepository.findAll().stream()
                .filter(room -> room.getHotelId().equals(hotelId))
                .toList();
        return ResponseEntity.ok(rooms);
    }

    // 3. Get details for a specific room
    @GetMapping("/rooms/{roomId}")
    public ResponseEntity<Room> getRoomById(@PathVariable Integer roomId) {
        Optional<Room> room = roomRepository.findById(roomId);
        return room.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // 4. Create a new booking (with user info, room, dates, special requests)
    @PostMapping
    public ResponseEntity<BookingResponse> createBooking(@RequestBody Map<String, Object> bookingData) {
        // Extract user info and booking info from request
        String email = (String) bookingData.get("email");
        String fullName = (bookingData.get("firstName") != null ? bookingData.get("firstName") : "") +
                (bookingData.get("lastName") != null ? (" " + bookingData.get("lastName")) : "");
        String phone = (String) bookingData.get("phone");
        Integer roomId = bookingData.get("roomId") != null ? Integer.parseInt(bookingData.get("roomId").toString()) : null;
        String specialRequests = (String) bookingData.get("specialRequests");
        String madonhang = (String) bookingData.get("madonhang");
        LocalDate checkInDate = bookingData.get("checkInDate") != null ? LocalDate.parse(bookingData.get("checkInDate").toString()) : null;
        LocalDate checkOutDate = bookingData.get("checkOutDate") != null ? LocalDate.parse(bookingData.get("checkOutDate").toString()) : null;
        // Find or create user
        User user = userRepository.findByEmail(email).orElseGet(() -> {
            User newUser = new User();
            newUser.setFullName(fullName.trim());
            newUser.setEmail(email);
            newUser.setPhone(phone);
            newUser.setPasswordHash(""); // No password for guest
            return userRepository.save(newUser);
        });
        // Create booking
        com.hotel.booking.entity.Booking booking = new com.hotel.booking.entity.Booking();
        booking.setUserId(user.getUserId());
        booking.setRoomId(roomId);
        booking.setCheckInDate(checkInDate);
        booking.setCheckOutDate(checkOutDate);
        booking.setStatus("Pending"); // Set default status to Pending
        booking.setRequest(specialRequests); // Store specialRequests in request field
        booking.setMadonhang(madonhang); // Store madonhang from payment
        booking.setCreatedAt(LocalDate.now());
        // Set hotelId if needed (fetch from room)
        com.hotel.booking.entity.Booking finalBooking = booking;
        roomRepository.findById(roomId).ifPresent(room -> finalBooking.setHotelId(room.getHotelId()));
        // Save booking using service
        booking = bookingService.saveBooking(booking);
        // Build response
        BookingResponse response = new BookingResponse();
        response.setBookingId(booking.getBookingId());
        response.setRoomId(booking.getRoomId());
        response.setCheckInDate(booking.getCheckInDate());
        response.setCheckOutDate(booking.getCheckOutDate());
        response.setStatus(booking.getStatus());
        response.setRequest(booking.getRequest());
        response.setMadonhang(booking.getMadonhang());
        hotelRepository.findById(booking.getHotelId()).ifPresent(hotel -> {
            response.setHotelName(hotel.getName());
            response.setHotelAddress(hotel.getAddress());
            // Thêm ảnh khách sạn
            if (hotel.getImgs() != null && !hotel.getImgs().isEmpty()) {
                response.setHotelImgs(hotel.getImgs());
            } else if (hotel.getImg() != null) {
                response.setHotelImgs(hotel.getImg());
            }
        });
        // Thêm ảnh phòng
        roomRepository.findById(booking.getRoomId()).ifPresent(room -> {
            if (room.getImgs() != null && !room.getImgs().isEmpty()) {
                response.setRoomImgs(room.getImgs());
            } else if (room.getImg() != null) {
                response.setRoomImgs(room.getImg());
            }
        });
        // Optionally add user info to response if needed
        return ResponseEntity.ok(response);
    }

    // 5. Initiate a payment (stub)
    @PostMapping("/payments/initiate")
    public ResponseEntity<Map<String, String>> initiatePayment(@RequestBody Map<String, Object> paymentRequest) {
        // TODO: Integrate with payment gateway
        return ResponseEntity.ok(Map.of("paymentUrl", "https://payment-gateway.example.com/checkout"));
    }

    // 6. Check payment status (stub)
    @GetMapping("/payments/status")
    public ResponseEntity<Map<String, String>> getPaymentStatus(@RequestParam String transactionId) {
        // TODO: Check payment status from payment gateway
        return ResponseEntity.ok(Map.of("status", "success"));
    }

    // 7. Send confirmation email (stub)
    @PostMapping("/send-confirmation-email")
    public ResponseEntity<String> sendConfirmationEmail(@RequestBody Map<String, Object> emailRequest) {
        // TODO: Send email using email service
        return ResponseEntity.ok("Confirmation email sent (stub)");
    }

    // 8. Get booking details for confirmation
    @GetMapping("/{bookingId}")
    public ResponseEntity<BookingResponse> getBookingById(@PathVariable Integer bookingId) {
        // Return booking details for confirmation
        return bookingService.findBookingById(bookingId)
                .map(booking -> {
                    BookingResponse response = new BookingResponse();
                    response.setBookingId(booking.getBookingId());
                    response.setRoomId(booking.getRoomId());
                    response.setCheckInDate(booking.getCheckInDate());
                    response.setCheckOutDate(booking.getCheckOutDate());
                    response.setStatus(booking.getStatus());
                    response.setRequest(booking.getRequest());
                    response.setMadonhang(booking.getMadonhang());
                    hotelRepository.findById(booking.getHotelId()).ifPresent(hotel -> {
                        response.setHotelName(hotel.getName());
                        response.setHotelAddress(hotel.getAddress());
                        // Thêm ảnh khách sạn
                        if (hotel.getImgs() != null && !hotel.getImgs().isEmpty()) {
                            response.setHotelImgs(hotel.getImgs());
                        } else if (hotel.getImg() != null) {
                            response.setHotelImgs(hotel.getImg());
                        }
                    });
                    // Thêm ảnh phòng
                    roomRepository.findById(booking.getRoomId()).ifPresent(room -> {
                        if (room.getImgs() != null && !room.getImgs().isEmpty()) {
                            response.setRoomImgs(room.getImgs());
                        } else if (room.getImg() != null) {
                            response.setRoomImgs(room.getImg());
                        }
                    });
                    return ResponseEntity.ok(response);
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
