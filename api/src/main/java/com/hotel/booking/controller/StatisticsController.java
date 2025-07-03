package com.hotel.booking.controller;

import com.hotel.booking.dto.StatisticsResponse;
import com.hotel.booking.service.StatisticsService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/statistics")
@RequiredArgsConstructor
public class StatisticsController {

    private final StatisticsService statisticsService;

    @GetMapping
    public StatisticsResponse getStatistics() {
        return statisticsService.getStatistics();
    }
}
