package com.hotel.booking.service;

import com.hotel.booking.dto.PredictionResponse;
import org.springframework.web.reactive.function.client.WebClient;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.net.http.HttpHeaders;
import java.util.Map;

@Service
public class BookingAiService {

    private final WebClient webClient;

    public BookingAiService() {
        this.webClient = WebClient.create("http://localhost:8000");
    }

    public PredictionResponse predictCancelation(Map<String, Object> aiInput) {
        // Gọi FastAPI: POST /predict_cancelation
        Map<String, Object> result = webClient.post()
                .uri("/predict_cancelation")
                .bodyValue(aiInput)
                .retrieve()
                .bodyToMono(Map.class)
                .block();

        System.out.println("🔥 AI prediction response: " + result);

        if (result == null || result.isEmpty()) {
            throw new RuntimeException("Could not get prediction from AI service");
        }

        PredictionResponse response = new PredictionResponse();
        response.setPrediction((int) result.get("prediction"));
        response.setProbability_of_cancellation(Double.parseDouble(result.get("probability_of_cancellation").toString()));
        response.setMessage(result.get("message").toString());

        return response;
    }
}
