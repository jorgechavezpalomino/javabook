package com.example.javabook.controller;

import com.example.javabook.dto.MessageResponse;
import com.example.javabook.service.WeatherService;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/weather")
public class WeatherController {

  private final WeatherService service;

  public WeatherController(WeatherService service) {
    this.service = service;
  }

  @GetMapping("/test")
  public ResponseEntity<MessageResponse> test() {
    return ResponseEntity.ok(new MessageResponse("Server Popping"));
  }

  @GetMapping
  public ResponseEntity<?> getWeather(
    @RequestParam(required = false) Double lat,
    @RequestParam(required = false) Double lon
  ) {
    if (lat == null || lon == null) {
      return ResponseEntity.badRequest()
        .body(new MessageResponse("lat and lon required"));
    }

    return ResponseEntity.ok(service.getWeather(lat, lon));
  }
}
