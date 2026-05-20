package com.resqride.controller;

import com.resqride.dto.AdminDashboardResponse;
import com.resqride.dto.ApiResponse;
import com.resqride.model.MechanicProfile;
import com.resqride.model.ServiceRequest;
import com.resqride.model.User;
import com.resqride.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AdminController {

    private final AdminService adminService;

    @GetMapping("/dashboard")
    public ApiResponse<AdminDashboardResponse> getDashboardStats() {
        AdminDashboardResponse response = adminService.getDashboardStats();

        return ApiResponse.<AdminDashboardResponse>builder()
                .success(true)
                .message("Admin dashboard stats fetched successfully")
                .data(response)
                .build();
    }

    @GetMapping("/users")
    public ApiResponse<List<User>> getAllUsers() {
        List<User> users = adminService.getAllUsers();

        return ApiResponse.<List<User>>builder()
                .success(true)
                .message("All users fetched successfully")
                .data(users)
                .build();
    }

    @GetMapping("/mechanics")
    public ApiResponse<List<MechanicProfile>> getAllMechanics() {
        List<MechanicProfile> mechanics = adminService.getAllMechanics();

        return ApiResponse.<List<MechanicProfile>>builder()
                .success(true)
                .message("All mechanics fetched successfully")
                .data(mechanics)
                .build();
    }

    @GetMapping("/mechanics/pending")
    public ApiResponse<List<MechanicProfile>> getPendingMechanics() {
        List<MechanicProfile> mechanics = adminService.getPendingMechanics();

        return ApiResponse.<List<MechanicProfile>>builder()
                .success(true)
                .message("Pending mechanics fetched successfully")
                .data(mechanics)
                .build();
    }

    @PutMapping("/mechanics/{mechanicProfileId}/verify")
    public ApiResponse<MechanicProfile> verifyMechanic(@PathVariable Long mechanicProfileId) {
        MechanicProfile mechanic = adminService.verifyMechanic(mechanicProfileId);

        return ApiResponse.<MechanicProfile>builder()
                .success(true)
                .message("Mechanic verified successfully")
                .data(mechanic)
                .build();
    }

    @GetMapping("/requests")
    public ApiResponse<List<ServiceRequest>> getAllRequests() {
        List<ServiceRequest> requests = adminService.getAllRequests();

        return ApiResponse.<List<ServiceRequest>>builder()
                .success(true)
                .message("All service requests fetched successfully")
                .data(requests)
                .build();
    }
}