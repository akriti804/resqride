package com.resqride.controller;

import com.resqride.dto.ApiResponse;
import com.resqride.dto.VehicleRequest;
import com.resqride.model.Vehicle;
import com.resqride.service.VehicleService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vehicles")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class VehicleController {

    private final VehicleService vehicleService;

    @PostMapping("/add/{userId}")
    public ApiResponse<Vehicle> addVehicle(
            @PathVariable Long userId,
            @Valid @RequestBody VehicleRequest request
    ) {
        Vehicle vehicle = vehicleService.addVehicle(userId, request);

        return ApiResponse.<Vehicle>builder()
                .success(true)
                .message("Vehicle added successfully")
                .data(vehicle)
                .build();
    }

    @GetMapping("/user/{userId}")
    public ApiResponse<List<Vehicle>> getUserVehicles(@PathVariable Long userId) {
        List<Vehicle> vehicles = vehicleService.getUserVehicles(userId);

        return ApiResponse.<List<Vehicle>>builder()
                .success(true)
                .message("User vehicles fetched successfully")
                .data(vehicles)
                .build();
    }

    @PutMapping("/{vehicleId}")
    public ApiResponse<Vehicle> updateVehicle(
            @PathVariable Long vehicleId,
            @Valid @RequestBody VehicleRequest request
    ) {
        Vehicle vehicle = vehicleService.updateVehicle(vehicleId, request);

        return ApiResponse.<Vehicle>builder()
                .success(true)
                .message("Vehicle updated successfully")
                .data(vehicle)
                .build();
    }

    @DeleteMapping("/{vehicleId}")
    public ApiResponse<String> deleteVehicle(@PathVariable Long vehicleId) {
        vehicleService.deleteVehicle(vehicleId);

        return ApiResponse.<String>builder()
                .success(true)
                .message("Vehicle deleted successfully")
                .data("Deleted vehicle ID: " + vehicleId)
                .build();
    }
}