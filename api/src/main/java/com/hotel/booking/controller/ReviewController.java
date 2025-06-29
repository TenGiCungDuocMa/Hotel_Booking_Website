package com.hotel.booking.controller;

import com.hotel.booking.dto.ReviewRequest;
import com.hotel.booking.dto.ReviewResponse;
import com.hotel.booking.entity.Review;
import com.hotel.booking.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;

    @PostMapping
    public ResponseEntity<?> createReview(
            Authentication authentication,
            @RequestBody ReviewRequest request) {

        try {
            ReviewResponse response = reviewService.submitReview(authentication, request);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @GetMapping
    public ResponseEntity<List<ReviewResponse>> getAllReviews(){
        List<ReviewResponse> listReview = reviewService.getAllValidReviews();
       return ResponseEntity.ok(listReview);
    }
}

