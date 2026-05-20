package com.resqride.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class MechanicProfileRequest {

    @NotBlank
    private String garageName;

    @NotBlank
    private String experience;

    @NotBlank
    private String servicesOffered;

    @NotNull
    private Double basePrice;

    @NotBlank
    private String location;

    private Double latitude;

    private Double longitude;

    private Boolean available;
}