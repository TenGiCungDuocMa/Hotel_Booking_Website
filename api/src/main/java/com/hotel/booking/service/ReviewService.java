package com.hotel.booking.service;

import com.hotel.booking.dto.ReviewRequest;
import com.hotel.booking.dto.ReviewResponse;
import com.hotel.booking.entity.Booking;
import com.hotel.booking.entity.Review;
import com.hotel.booking.entity.Room;
import com.hotel.booking.entity.User;
import com.hotel.booking.repository.BookingRepository;
import com.hotel.booking.repository.ReviewRepository;
import com.hotel.booking.repository.RoomRepository;
import com.hotel.booking.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;
    private final RoomRepository roomRepository;

    /**
     * Gửi đánh giá (review) cho một booking của người dùng hiện tại
     */
    public ReviewResponse submitReview(Authentication authentication, ReviewRequest request) {
        User user = (User) authentication.getPrincipal();

        // 1. Kiểm tra quyền sở hữu booking
        Booking booking = bookingRepository.findByBookingIdAndUserId(request.getBookingId(), user.getUserId())
                .orElseThrow(() -> new RuntimeException("Bạn không có quyền đánh giá booking này"));

        // 2. Kiểm tra đã review chưa
        if (reviewRepository.findByBookingId(request.getBookingId()).isPresent()) {
            throw new RuntimeException("Booking này đã được đánh giá");
        }

        // 3. Kiểm tra nội dung hợp lệ
        if (request.getRating() == null || request.getComment() == null || request.getComment().isBlank()) {
            throw new RuntimeException("Thiếu thông tin đánh giá");
        }

        // 4. Tạo và lưu review
        Review review = new Review();
        review.setUserId(user.getUserId());
        review.setBookingId(request.getBookingId());
        review.setRating(request.getRating());
        review.setComment(request.getComment());

        // TODO: Phân tích cảm xúc / phát hiện spam có thể thêm sau

        Review saved = reviewRepository.save(review);

        // 5. Trả về response DTO
        return mapToDto(saved);
    }

    /**
     * Lấy toàn bộ đánh giá có isSpam = false để hiển thị cho người dùng
     */
    public List<ReviewResponse> getAllValidReviews() {
        List<Review> reviews = reviewRepository.findAll()
                .stream()
                .filter(r -> !Boolean.TRUE.equals(r.getIsSpam()))
                .collect(Collectors.toList());

        return reviews.stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    /**
     * Map từ entity Review sang DTO ReviewResponse
     */
    private ReviewResponse mapToDto(Review review) {
        ReviewResponse response = new ReviewResponse();

        User user = userRepository.findByUserId(review.getUserId()).orElse(null);
        Booking booking = bookingRepository.findById(review.getBookingId()).orElse(null);
        Room room = (booking != null) ? roomRepository.findById(booking.getRoomId()).orElse(null) : null;

        if (user != null) {
            response.setUserName(user.getFullName());
        }
        if (room != null) {
            response.setRoomNumber(room.getRoomNumber());
            response.setCapacity(room.getCapacity());
        }

        response.setRating(review.getRating());
        response.setComment(review.getComment());
        response.setSpam(Boolean.TRUE.equals(review.getIsSpam()));
        response.setSentiment(review.getSentiment());
        response.setConfidenceScore(review.getConfidenceScore());
        response.setCreatedAt(review.getCreatedAt());

        return response;
    }
}
