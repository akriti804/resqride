package com.resqride.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class VehicleRequest {

    @NotBlank
    private String vehicleType;

    @NotBlank
    private String brand;

    @NotBlank
    private String model;

    @NotBlank
    private String registrationNumber;

    @NotBlank
    private String fuelType;
}