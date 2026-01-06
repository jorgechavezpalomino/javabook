package com.example.javabook.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.springframework.test.web.client.match.MockRestRequestMatchers.requestTo;
import static org.springframework.test.web.client.response.MockRestResponseCreators.withSuccess;

import com.example.javabook.dto.WeatherResponse;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.client.RestClientTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.http.MediaType;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.web.client.MockRestServiceServer;
import org.springframework.web.client.RestClient;

@RestClientTest(WeatherService.class)
@TestPropertySource(properties = "weatherApi.key=test-key")
class WeatherServiceRestClientTest {

  @Autowired
  private WeatherService weatherService;

  @Autowired
  private MockRestServiceServer server;

  @TestConfiguration
  static class RestClientConfig {

    @Bean
    RestClient restClient(RestClient.Builder builder) {
      return builder.build();
    }
  }

  @Test
  void shouldReturnWeatherResponse() {
    server
      .expect(
        requestTo(
          "https://api.weatherapi.com/v1/current.json?key=test-key&q=-12.04,-77.03"
        )
      )
      .andRespond(
        withSuccess(
          """
            {
              "location": { "name": "Lima" },
              "current": { "temp_c": 25.0, "humidity": 70 }
            }
          """,
          MediaType.APPLICATION_JSON
        )
      );

    WeatherResponse response = weatherService.getWeather(-12.04, -77.03);

    assertEquals("Lima", response.city());
    assertEquals("25.0°C", response.temperature());
    assertEquals("70%", response.humidity());
  }
}
