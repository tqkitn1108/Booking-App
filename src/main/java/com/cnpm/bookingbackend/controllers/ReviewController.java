package com.cnpm.bookingbackend.controllers;

import com.cnpm.bookingbackend.dtos.request.ReviewDto;
import com.cnpm.bookingbackend.models.Review;
import com.cnpm.bookingbackend.services.ReviewService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/hotels")
public class ReviewController {
    private final ReviewService reviewService;

    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }


    @GetMapping("/{hotelId}/reviews")
    public ResponseEntity<List<Review>> getAllReviews(@PathVariable String hotelId) {
        return new ResponseEntity<>(reviewService.allReviews(hotelId), HttpStatus.OK);
    }

    @GetMapping("/{hotelId}/reviews/topRating")
    public ResponseEntity<List<Review>> getTopRating(@PathVariable String hotelId) {
        return ResponseEntity.ok(reviewService.topRating(hotelId));
    }

    @PostMapping("/{hotelId}/reviews")
    public ResponseEntity<Review> createReview(@Valid @RequestBody ReviewDto reviewDto, @PathVariable String hotelId) {
        return new ResponseEntity<>(reviewService.newReview(reviewDto, hotelId), HttpStatus.CREATED);
    }

    @PutMapping("/{hotelId}/reviews/{id}")
    public ResponseEntity<Review> editReview(@PathVariable String id, @RequestBody Review review) {
        return ResponseEntity.ok(reviewService.updateReview(id, review));
    }

    @DeleteMapping("/{hotelId}/reviews/{id}")
    public ResponseEntity<String> deleteReview(@PathVariable String hotelId, @PathVariable String id) {
        reviewService.deleteReview(hotelId, id);
        return ResponseEntity.ok("The review has been deleted successfully");
    }

}
