package com.resqride.controller;

import com.resqride.dto.ApiResponse;
import com.resqride.dto.ServiceRequestDto;
import com.resqride.dto.StatusUpdateRequest;
import com.resqride.model.ServiceRequest;
import com.resqride.service.ServiceRequestService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/requests")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ServiceRequestController {

    private final ServiceRequestService serviceRequestService;

    @PostMapping("/create")
    public ApiResponse<ServiceRequest> createRequest(@Valid @RequestBody ServiceRequestDto requestDto) {
        ServiceRequest request = serviceRequestService.createRequest(requestDto);

        return ApiResponse.<ServiceRequest>builder()
                .success(true)
                .message("Service request created successfully")
                .data(request)
                .build();
    }

    @GetMapping("/user/{userId}")
    public ApiResponse<List<ServiceRequest>> getUserRequests(@PathVariable Long userId) {
        List<ServiceRequest> requests = serviceRequestService.getUserRequests(userId);

        return ApiResponse.<List<ServiceRequest>>builder()
                .success(true)
                .message("User service requests fetched successfully")
                .data(requests)
                .build();
    }

    @GetMapping("/all")
    public ApiResponse<List<ServiceRequest>> getAllRequests() {
        List<ServiceRequest> requests = serviceRequestService.getAllRequests();

        return ApiResponse.<List<ServiceRequest>>builder()
                .success(true)
                .message("All service requests fetched successfully")
                .data(requests)
                .build();
    }

    @GetMapping("/pending")
    public ApiResponse<List<ServiceRequest>> getPendingRequests() {
        List<ServiceRequest> requests = serviceRequestService.getPendingRequests();

        return ApiResponse.<List<ServiceRequest>>builder()
                .success(true)
                .message("Pending service requests fetched successfully")
                .data(requests)
                .build();
    }

    @PutMapping("/{requestId}/accept/{mechanicProfileId}")
    public ApiResponse<ServiceRequest> acceptRequest(
            @PathVariable Long requestId,
            @PathVariable Long mechanicProfileId
    ) {
        ServiceRequest request = serviceRequestService.acceptRequest(requestId, mechanicProfileId);

        return ApiResponse.<ServiceRequest>builder()
                .success(true)
                .message("Service request accepted successfully")
                .data(request)
                .build();
    }

    @PutMapping("/{requestId}/reject")
    public ApiResponse<ServiceRequest> rejectRequest(@PathVariable Long requestId) {
        ServiceRequest request = serviceRequestService.rejectRequest(requestId);

        return ApiResponse.<ServiceRequest>builder()
                .success(true)
                .message("Service request rejected successfully")
                .data(request)
                .build();
    }

    @PutMapping("/{requestId}/status")
    public ApiResponse<ServiceRequest> updateStatus(
            @PathVariable Long requestId,
            @Valid @RequestBody StatusUpdateRequest statusUpdateRequest
    ) {
        ServiceRequest request = serviceRequestService.updateStatus(requestId, statusUpdateRequest.getStatus());

        return ApiResponse.<ServiceRequest>builder()
                .success(true)
                .message("Service request status updated successfully")
                .data(request)
                .build();
    }

    @GetMapping("/mechanic/{mechanicProfileId}")
    public ApiResponse<List<ServiceRequest>> getMechanicJobs(@PathVariable Long mechanicProfileId) {
        List<ServiceRequest> jobs = serviceRequestService.getMechanicJobs(mechanicProfileId);

        return ApiResponse.<List<ServiceRequest>>builder()
                .success(true)
                .message("Mechanic jobs fetched successfully")
                .data(jobs)
                .build();
    }
}