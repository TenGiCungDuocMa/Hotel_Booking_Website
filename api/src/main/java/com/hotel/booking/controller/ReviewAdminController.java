package com.hotel.booking.controller;

import com.hotel.booking.entity.Review;
import com.hotel.booking.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/reviews")
@RequiredArgsConstructor
public class ReviewAdminController {

    private final ReviewService reviewService;

    // ✅ Lấy danh sách review, có thể lọc theo spam=true
    @GetMapping
    public List<Review> getReviews(@RequestParam(required = false) Boolean spam) {
        if (Boolean.TRUE.equals(spam)) {
            return reviewService.getSpamReviews();
        }
        return reviewService.getAllReviews();
    }

    // ✅ Cập nhật 1 review (ví dụ: isSpam=false)
    @PutMapping("/{id}")
    public ResponseEntity<String> updateReview(@PathVariable Integer id) {
        reviewService.unmarkSpam(id);
        return ResponseEntity.ok("Cập nhật review thành công.");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteReview(@PathVariable Integer id) {
        reviewService.deleteReview(id);
        return ResponseEntity.ok("Review đã bị xoá.");
    }

}
