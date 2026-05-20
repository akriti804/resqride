package com.resqride.dto;

import com.resqride.model.ServiceType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ServiceRequestDto {

    @NotNull
    private Long userId;

    @NotNull
    private Long vehicleId;

    @NotNull
    private ServiceType serviceType;

    @NotBlank
    private String breakdownLocation;

    private Double latitude;

    private Double longitude;

    private String issueDescription;
}