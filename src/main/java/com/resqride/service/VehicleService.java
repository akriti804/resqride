package com.resqride.service;

import com.resqride.dto.VehicleRequest;
import com.resqride.exception.BadRequestException;
import com.resqride.exception.ResourceNotFoundException;
import com.resqride.model.User;
import com.resqride.model.Vehicle;
import com.resqride.repository.UserRepository;
import com.resqride.repository.VehicleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class VehicleService {

    private final VehicleRepository vehicleRepository;
    private final UserRepository userRepository;

    // ADD VEHICLE
    public Vehicle addVehicle(Long userId, VehicleRequest request) {

        if (vehicleRepository.existsByRegistrationNumber(request.getRegistrationNumber())) {
            throw new BadRequestException("Vehicle already exists with this registration number");
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Vehicle vehicle = Vehicle.builder()
                .vehicleType(request.getVehicleType())
                .brand(request.getBrand())
                .model(request.getModel())
                .registrationNumber(request.getRegistrationNumber())
                .fuelType(request.getFuelType())
                .user(user)
                .build();

        return vehicleRepository.save(vehicle);
    }

    // GET USER VEHICLES
    public List<Vehicle> getUserVehicles(Long userId) {
        return vehicleRepository.findByUserId(userId);
    }

    // UPDATE VEHICLE
    public Vehicle updateVehicle(Long vehicleId, VehicleRequest request) {

        Vehicle vehicle = vehicleRepository.findById(vehicleId)
                .orElseThrow(() -> new ResourceNotFoundException("Vehicle not found"));

        vehicle.setVehicleType(request.getVehicleType());
        vehicle.setBrand(request.getBrand());
        vehicle.setModel(request.getModel());
        vehicle.setRegistrationNumber(request.getRegistrationNumber());
        vehicle.setFuelType(request.getFuelType());

        return vehicleRepository.save(vehicle);
    }

    // DELETE VEHICLE
    public void deleteVehicle(Long vehicleId) {

        Vehicle vehicle = vehicleRepository.findById(vehicleId)
                .orElseThrow(() -> new ResourceNotFoundException("Vehicle not found"));

        try {
            vehicleRepository.delete(vehicle);
        } catch (Exception e) {
            throw new BadRequestException(
                    "This vehicle cannot be deleted because it is linked with existing service requests"
            );
        }
    }
}