package com.example.javabook.service;

import com.example.javabook.dto.WeatherResponse;
import com.example.javabook.dto.api.WeatherApiResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

@Service
public class WeatherService {

  @Value("${weatherApi.key}")
  private String apiKey;

  RestClient client = RestClient.create();

  public WeatherResponse getWeather(double lat, double lon) {
    WeatherApiResponse data = client
      .get()
      .uri(
        "https://api.weatherapi.com/v1/current.json?key={key}&q={lat},{lon}",
        apiKey,
        lat,
        lon
      )
      .retrieve()
      .body(WeatherApiResponse.class);

    return new WeatherResponse(
      data.getLocation().getName(),
      data.getCurrent().getTemp_c() + "°C",
      data.getCurrent().getHumidity() + "%"
    );
  }
}
