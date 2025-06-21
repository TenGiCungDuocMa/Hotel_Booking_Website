package com.hotel.booking.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class Demo{
    @GetMapping("/hello")
    public Map<String, String> sayHello() {
        return Map.of("data", "Hello World");
    }
}