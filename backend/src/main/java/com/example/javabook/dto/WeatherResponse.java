package com.example.javabook.dto;

public record WeatherResponse(
        String city,
        String temperature,
        String humidity
) {}