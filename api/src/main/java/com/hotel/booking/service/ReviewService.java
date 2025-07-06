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
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;
    private final RoomRepository roomRepository;

    /**
     * Submit a review for a booking
     */
    public ReviewResponse submitReview(Authentication authentication, ReviewRequest request) {
        User user = (User) authentication.getPrincipal();

        Booking booking = bookingRepository.findByMadonhang(request.getMadonhang())
                .orElseThrow(() -> new RuntimeException("Booking does not exist"));
//        // Check booking ownership
//        if (!booking.getUserId().equals(user.getUserId())) {
//            throw new RuntimeException("You are not authorized to review this booking");
//        }
        // Only allow review if status is CheckedIn, CheckedOut, or Completed
        String status = booking.getStatus();
        if (!("CheckedIn".equalsIgnoreCase(status)
                || "CheckedOut".equalsIgnoreCase(status)
                || "Completed".equalsIgnoreCase(status))) {
            throw new RuntimeException("You can only review after check-in or check-out");
        }

        // Check if the booking was already reviewed
        if (reviewRepository.findByBookingId(booking.getBookingId()).isPresent()) {
            throw new RuntimeException("This booking has already been reviewed");
        }

        // Validate review content
        if (request.getRating() == null || request.getComment() == null || request.getComment().isBlank()) {
            throw new RuntimeException("Rating and comment are required");
        }

        // Save the review
        Review review = new Review();
        review.setUserId(user.getUserId());
        review.setBookingId(booking.getBookingId());
        review.setRating(request.getRating());
        review.setComment(request.getComment());

        Map<String, String> requestBody = Map.of("text", String.valueOf(request.getComment()));

        // Call external service for spam/sentiment analysis
        WebClient webClient = WebClient.create("http://localhost:8000");

        Map<String, Object> sentiment = webClient.post()
                .uri("/analyze")
                .bodyValue(requestBody)
                .retrieve()
                .bodyToMono(Map.class)
                .block();

        System.out.println("Sentiment response: " + sentiment);

        if (sentiment == null || sentiment.isEmpty()) {
            throw new RuntimeException("Could not analyze sentiment from external service");
        }

        if (String.valueOf(sentiment.get("is_spam")).equalsIgnoreCase("True")) {
            review.setIsSpam(true);
            review.setSentiment("");
            review.setConfidenceScore(Float.parseFloat(String.valueOf(sentiment.get("spam_confidence"))));
        } else {
            review.setIsSpam(false);
            review.setSentiment(String.valueOf(sentiment.get("sentiment")));
            review.setConfidenceScore(Float.parseFloat(String.valueOf(sentiment.get("sentiment_confidence"))));
        }

        Review saved = reviewRepository.save(review);
        return mapToDto(saved);
    }

    /**
     * Get all valid reviews (non-spam)
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
     * Get all reviews (admin)
     */
    public List<Review> getAllReviews() {
        return reviewRepository.findAll();
    }

    /**
     * Get all spam reviews (admin)
     */
    public List<Review> getSpamReviews() {
        return reviewRepository.findByIsSpamTrue();
    }

    /**
     * Unmark spam review (admin)
     */
    public void unmarkSpam(Integer id) {
        Review review = reviewRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Review not found"));

        review.setIsSpam(false);
        reviewRepository.save(review);
    }

    /**
     * Delete a review
     */
    public void deleteReview(Integer id) {
        if (!reviewRepository.existsById(id)) {
            throw new RuntimeException("Review does not exist");
        }
        reviewRepository.deleteById(id);
    }

    /**
     * Convert entity to DTO
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
