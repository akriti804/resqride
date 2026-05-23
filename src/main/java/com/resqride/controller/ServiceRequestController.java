package com.resqride.controller;

import com.resqride.entity.ServiceRequest;
import com.resqride.model.RequestStatus;
import com.resqride.service.ServiceRequestService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/service-requests")
@CrossOrigin(origins = "*")
public class ServiceRequestController {

    private final ServiceRequestService serviceRequestService;

    public ServiceRequestController(ServiceRequestService serviceRequestService) {
        this.serviceRequestService = serviceRequestService;
    }

    @PostMapping
    public ServiceRequest createRequest(@RequestBody ServiceRequest request) {
        return serviceRequestService.createRequest(request);
    }

    @GetMapping
    public List<ServiceRequest> getAllRequests() {
        return serviceRequestService.getAllRequests();
    }

    @GetMapping("/pending")
    public List<ServiceRequest> getPendingRequests() {
        return serviceRequestService.getPendingRequests();
    }

    @GetMapping("/user/{userId}")
    public List<ServiceRequest> getUserRequests(@PathVariable Long userId) {
        return serviceRequestService.getUserRequests(userId);
    }

    @GetMapping("/mechanic/{mechanicId}")
    public List<ServiceRequest> getMechanicRequests(@PathVariable Long mechanicId) {
        return serviceRequestService.getMechanicRequests(mechanicId);
    }

    @PutMapping("/{requestId}/accept")
    public ServiceRequest acceptRequest(
            @PathVariable Long requestId,
            @RequestParam Long mechanicId
    ) {
        return serviceRequestService.acceptRequest(requestId, mechanicId);
    }

    @PutMapping("/{requestId}/reject")
    public ServiceRequest rejectRequest(@PathVariable Long requestId) {
        return serviceRequestService.rejectRequest(requestId);
    }

    @PutMapping("/{requestId}/status")
    public ServiceRequest updateStatus(
            @PathVariable Long requestId,
            @RequestParam String status
    ) {
        return serviceRequestService.updateStatus(requestId, status);
    }
}