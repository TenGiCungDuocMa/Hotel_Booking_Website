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
     * Gửi đánh giá cho 1 booking
     */
    public ReviewResponse submitReview(Authentication authentication, ReviewRequest request) {
        User user = (User) authentication.getPrincipal();

        Booking booking = bookingRepository.findById(request.getBookingId())
                .orElseThrow(() -> new RuntimeException("Booking không tồn tại"));

        // Kiểm tra quyền sở hữu booking
        if (!booking.getUserId().equals(user.getUserId())) {
            throw new RuntimeException("Bạn không có quyền đánh giá booking này");
        }

        // Chỉ cho phép review nếu status là CheckedIn, CheckedOut hoặc Completed
        String status = booking.getStatus();
        if (!("CheckedIn".equalsIgnoreCase(status)
                || "CheckedOut".equalsIgnoreCase(status)
                || "Completed".equalsIgnoreCase(status))) {
            throw new RuntimeException("Chỉ có thể đánh giá sau khi nhận/trả phòng");
        }

        // Kiểm tra đã đánh giá chưa
        if (reviewRepository.findByBookingId(request.getBookingId()).isPresent()) {
            throw new RuntimeException("Booking này đã được đánh giá");
        }

        // Kiểm tra nội dung đánh giá
        if (request.getRating() == null || request.getComment() == null || request.getComment().isBlank()) {
            throw new RuntimeException("Thiếu thông tin đánh giá");
        }

        // Lưu đánh giá
        Review review = new Review();
        review.setUserId(user.getUserId());
        review.setBookingId(request.getBookingId());
        review.setRating(request.getRating());
        review.setComment(request.getComment());

        Review saved = reviewRepository.save(review);
        return mapToDto(saved);
    }


    /**
     * Lấy tất cả review không bị spam
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
     * Lấy tất cả review (admin)
     */
    public List<Review> getAllReviews() {
        return reviewRepository.findAll();
    }

    /**
     * Lấy review bị đánh dấu spam (admin)
     */
    public List<Review> getSpamReviews() {
        return reviewRepository.findByIsSpamTrue();
    }


    /**
     * Dành cho trường hợp đơn giản: chỉ bỏ spam (không dùng DTO)
     */
    public void unmarkSpam(Integer id) {
        Review review = reviewRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy review"));

        review.setIsSpam(false);
        reviewRepository.save(review);
    }
    public void deleteReview(Integer id) {
        if (!reviewRepository.existsById(id)) {
            throw new RuntimeException("Review không tồn tại");
        }
        reviewRepository.deleteById(id);
    }

    /**
     * Convert entity → DTO
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
