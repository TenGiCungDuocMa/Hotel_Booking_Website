package com.hotel.booking.controller;

import com.hotel.booking.dto.BookingResponse;
import com.hotel.booking.dto.BookingValidationResponse;
import com.hotel.booking.dto.PredictionResponse;
import com.hotel.booking.entity.Hotel;
import com.hotel.booking.entity.Room;
import com.hotel.booking.repository.BookingRepository;
import com.hotel.booking.repository.HotelRepository;
import com.hotel.booking.repository.RoomRepository;
import com.hotel.booking.service.BookingAiService;
import com.hotel.booking.service.BookingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import org.springframework.beans.factory.annotation.Autowired;

import java.time.DayOfWeek;
import java.time.temporal.ChronoUnit;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;
import java.util.Map;
import com.hotel.booking.entity.User;
import com.hotel.booking.repository.UserRepository;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.WeekFields;

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
    @Autowired
    private BookingRepository bookingRepository;
    @Autowired
    private BookingAiService bookingAiService;


    @GetMapping
    public ResponseEntity<List<BookingResponse>> getBookings(Authentication authentication) {
        return ResponseEntity.ok(bookingService.getBookingHistoryByUserId(authentication));
    }
    @DeleteMapping("/{bookingId}")
    public ResponseEntity<?> cancelBooking(@PathVariable Integer bookingId, Authentication authentication) {
        bookingService.cancelBooking(bookingId, authentication);
        return ResponseEntity.ok("Booking cancelled successfully");
    }

//    @PutMapping("/{bookingId}")
//    public ResponseEntity<BookingResponse> updateBooking(
//            @PathVariable Integer bookingId,
//            @RequestBody BookingUpdateRequest request,
//            Authentication authentication
//    ) {
//        return ResponseEntity.ok(bookingService.updateBooking(bookingId, request, authentication));
//    }

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
        booking.setCreatedAt(LocalDateTime.now());
        // Set hotelId if needed (fetch from room)
        com.hotel.booking.entity.Booking finalBooking = booking;
        roomRepository.findById(roomId).ifPresent(room -> finalBooking.setHotelId(room.getHotelId()));
        // Save booking using service
        booking = bookingService.saveBooking(booking);
        // api predict cancel
        // 4. Predict cancelation using AI
        try {
            Map<String, Object> aiInput = new HashMap<>();
            aiInput.put("lead_time", ChronoUnit.DAYS.between(LocalDate.now(), booking.getCheckInDate()));
            aiInput.put("arrival_date_month", booking.getCheckInDate().getMonth().toString());
            aiInput.put("arrival_date_week_number", booking.getCheckInDate().get(WeekFields.ISO.weekOfWeekBasedYear()));
            aiInput.put("arrival_date_day_of_month", booking.getCheckInDate().getDayOfMonth());

            // Tính tổng số ngày ở
            long totalStay = ChronoUnit.DAYS.between(checkInDate, checkOutDate);
            int weekendNights = countWeekendNights(checkInDate, checkOutDate);
            int weekNights = (int) totalStay - weekendNights;

            aiInput.put("stays_in_weekend_nights", weekendNights);
            aiInput.put("stays_in_week_nights", weekNights);

            aiInput.put("adults", bookingData.getOrDefault("adults", 1));
            aiInput.put("children", Double.parseDouble(bookingData.getOrDefault("children", "0").toString()));
            aiInput.put("babies", bookingData.getOrDefault("babies", 0));

            if (user != null) {
                int countBooking = Integer.parseInt(bookingRepository.countByUserId(user.getUserId())+"");
                aiInput.put("is_repeated_guest", countBooking > 1 ? 1 : 0);
            } else {
                aiInput.put("is_repeated_guest", 0);
            }

            long cancelCount = bookingRepository.countByUserIdAndStatus(user.getUserId(), "Canceled");
            aiInput.put("previous_cancellations", cancelCount);
            long notCanceled = bookingRepository.countByUserIdAndStatusNot(user.getUserId(), "Canceled");
            aiInput.put("previous_bookings_not_canceled", notCanceled);
            aiInput.put("days_in_waiting_list",
                    Math.max(ChronoUnit.DAYS.between(booking.getCreatedAt().toLocalDate(), booking.getCheckInDate()), 0));

            Room room = roomRepository.findById(booking.getRoomId()).orElse(null);
            double priceVND = room != null ? room.getPricePerNight() : 2400000.0;
            double adrUSD = priceVND / 24000.0; // VND → USD

            aiInput.put("adr", adrUSD);

            if (specialRequests != null && !specialRequests.trim().isEmpty()) {
                String[] requests = specialRequests.split(",");
                aiInput.put("total_of_special_requests", requests.length);
            } else {
                aiInput.put("total_of_special_requests", 0);
            }
            System.out.println("=== DỮ LIỆU ĐƯA VÀO AI (aiInput) ===");
            aiInput.forEach((key, value) -> System.out.println(key + ": " + value));
            System.out.println("=====================================");

            PredictionResponse aiResponse = bookingAiService.predictCancelation(aiInput);

            if (aiResponse != null) {
                booking.setAiPrediction(aiResponse.getPrediction());
                booking.setAiConfidence(aiResponse.getProbability_of_cancellation());
                bookingService.saveBooking(booking); // Update with AI result
            }

        } catch (Exception e) {
            System.err.println("❌ Lỗi gọi AI: " + e.getMessage());
        }

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

    private int countWeekendNights(LocalDate checkIn, LocalDate checkOut) {
        int count = 0;
        LocalDate current = checkIn;
        while (current.isBefore(checkOut)) {
            DayOfWeek day = current.getDayOfWeek();
            if (day == DayOfWeek.SATURDAY || day == DayOfWeek.SUNDAY) {
                count++;
            }
            current = current.plusDays(1);
        }
        return count;
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
    @GetMapping("/validate/{madonhang}")
    public ResponseEntity<BookingValidationResponse> validateBooking(@PathVariable String madonhang) {
        BookingValidationResponse response = bookingService.validateBooking(madonhang);
        return ResponseEntity.ok(response);
    }
}
