package com.hotel.booking.service;

import com.hotel.booking.dto.BookingResponse;
import com.hotel.booking.dto.BookingUpdateRequest;
import com.hotel.booking.entity.Booking;
import com.hotel.booking.entity.Room;
import com.hotel.booking.entity.Hotel;
import com.hotel.booking.entity.User;
import com.hotel.booking.repository.BookingRepository;
import com.hotel.booking.repository.RoomRepository;
import com.hotel.booking.repository.HotelRepository;
import com.hotel.booking.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BookingService {

    private final BookingRepository bookingRepository;
    private final RoomRepository roomRepository;
    private final HotelRepository hotelRepository;
    private final UserRepository userRepository;

    public List<BookingResponse> getUserBookings(Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        Integer userId = user.getUserId();
        List<Booking> bookings = bookingRepository.findByUserId(userId);
        return bookings.stream().map(this::toDto).collect(Collectors.toList());
    }

    private BookingResponse toDto(Booking booking) {
        BookingResponse dto = new BookingResponse();
        dto.setBookingId(booking.getBookingId());
        dto.setRoomId(booking.getRoomId());
        dto.setCheckInDate(booking.getCheckInDate());
        dto.setCheckOutDate(booking.getCheckOutDate());
        dto.setStatus(booking.getStatus());
        hotelRepository.findById(booking.getHotelId()).ifPresent(hotel -> {
            dto.setHotelName(hotel.getName());
            dto.setHotelAddress(hotel.getAddress());
        });
//        roomRepository.findById(booking.getRoomId()).ifPresent(room -> {
//            dto.setRoomNumber(room.getRoomNumber());
//        });

        return dto;
    }
    public void cancelBooking(Integer bookingId, Authentication authentication){
        User user = (User) authentication.getPrincipal();
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        // Cập nhật trạng thái về 'Canceled'
        booking.setStatus("Canceled");
        bookingRepository.save(booking);
    }
    public BookingResponse updateBooking(Integer bookingId, BookingUpdateRequest request, Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        // Kiểm tra quyền
        if (!booking.getUserId().equals(user.getUserId())) {
            throw new RuntimeException("You are not authorized to update this booking");
        }

        // Kiểm tra logic ngày
        if (request.getCheckOutDate().isBefore(request.getCheckInDate())) {
            throw new RuntimeException("Check-out date must be after check-in date");
        }

        // Cập nhật thông tin
        booking.setCheckInDate(request.getCheckInDate());
        booking.setCheckOutDate(request.getCheckOutDate());
//        if (request.getStatus() != null) {
//            booking.setStatus(request.getStatus());
//        }

        bookingRepository.save(booking);

        // Convert to DTO để trả về
        return toDto(booking);
    }

    public Booking saveBooking(Booking booking) {
        return bookingRepository.save(booking);
    }

    public Optional<Booking> findBookingById(Integer bookingId) {
        return bookingRepository.findById(bookingId);
    }
}