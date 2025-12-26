package com.example.javabook.dto.api;

public class WeatherApiResponse {
    private Location location;
    private Current current;

    public Location getLocation() {
        return location;
    }

    public Current getCurrent() {
        return current;
    }
}