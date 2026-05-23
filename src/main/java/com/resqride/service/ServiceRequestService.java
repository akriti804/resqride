package com.resqride.service;

import com.resqride.model.RequestStatus;
import com.resqride.entity.ServiceRequest;
import com.resqride.repository.ServiceRequestRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ServiceRequestService {

    private final ServiceRequestRepository serviceRequestRepository;

    public ServiceRequestService(ServiceRequestRepository serviceRequestRepository) {
        this.serviceRequestRepository = serviceRequestRepository;
    }

    public ServiceRequest createRequest(ServiceRequest request) {
        request.setStatus("PENDING");
        return serviceRequestRepository.save(request);
    }

    public List<ServiceRequest> getAllRequests() {
        return serviceRequestRepository.findAll();
    }

    public List<ServiceRequest> getPendingRequests() {
        return serviceRequestRepository.findByStatus(RequestStatus.PENDING);
    }

    public List<ServiceRequest> getUserRequests(Long userId) {
        return serviceRequestRepository.findByUserId(userId);
    }

    public List<ServiceRequest> getMechanicRequests(Long mechanicId) {
        return serviceRequestRepository.findByMechanicId(mechanicId);
    }

    public ServiceRequest acceptRequest(Long requestId, Long mechanicId) {
        ServiceRequest request = serviceRequestRepository.findById(requestId)
                .orElseThrow(() -> new RuntimeException("Request not found"));

        request.setMechanicId(mechanicId);
        request.setStatus("ACCEPTED");

        return serviceRequestRepository.save(request);
    }

    public ServiceRequest rejectRequest(Long requestId) {
        ServiceRequest request = serviceRequestRepository.findById(requestId)
                .orElseThrow(() -> new RuntimeException("Request not found"));

        request.setStatus("REJECTED");

        return serviceRequestRepository.save(request);
    }

    public ServiceRequest updateStatus(Long requestId, String status) {
        ServiceRequest request = serviceRequestRepository.findById(requestId)
                .orElseThrow(() -> new RuntimeException("Request not found"));

        request.setStatus(status);

        return serviceRequestRepository.save(request);
    }
}