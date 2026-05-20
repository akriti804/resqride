package com.resqride.service;

import com.resqride.dto.ServiceRequestDto;
import com.resqride.model.*;
import com.resqride.repository.MechanicProfileRepository;
import com.resqride.repository.ServiceRequestRepository;
import com.resqride.repository.UserRepository;
import com.resqride.repository.VehicleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import com.resqride.exception.BadRequestException;
import com.resqride.exception.ResourceNotFoundException;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ServiceRequestService {

    private final ServiceRequestRepository serviceRequestRepository;
    private final UserRepository userRepository;
    private final VehicleRepository vehicleRepository;
    private final MechanicProfileRepository mechanicProfileRepository;

    public ServiceRequest createRequest(ServiceRequestDto requestDto) {

        User user = userRepository.findById(requestDto.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Vehicle vehicle = vehicleRepository.findById(requestDto.getVehicleId())
                .orElseThrow(() -> new ResourceNotFoundException("Vehicle not found"));

        ServiceRequest serviceRequest = ServiceRequest.builder()
                .user(user)
                .vehicle(vehicle)
                .serviceType(requestDto.getServiceType())
                .breakdownLocation(requestDto.getBreakdownLocation())
                .latitude(requestDto.getLatitude())
                .longitude(requestDto.getLongitude())
                .issueDescription(requestDto.getIssueDescription())
                .status(RequestStatus.PENDING)
                .estimatedPrice(499.0)
                .build();

        return serviceRequestRepository.save(serviceRequest);
    }

    public List<ServiceRequest> getUserRequests(Long userId) {
        return serviceRequestRepository.findByUserId(userId);
    }

    public List<ServiceRequest> getAllRequests() {
        return serviceRequestRepository.findAll();
    }

    public List<ServiceRequest> getPendingRequests() {
        return serviceRequestRepository.findByStatus(RequestStatus.PENDING);
    }

    public ServiceRequest acceptRequest(Long requestId, Long mechanicProfileId) {

        ServiceRequest request = serviceRequestRepository.findById(requestId)
                .orElseThrow(() -> new ResourceNotFoundException("Service request not found"));

        MechanicProfile mechanicProfile = mechanicProfileRepository.findById(mechanicProfileId)
                .orElseThrow(() -> new ResourceNotFoundException("Mechanic profile not found"));

        if (!Boolean.TRUE.equals(mechanicProfile.getVerified())) {
            throw new BadRequestException("Mechanic is not verified by admin");
        }

        request.setMechanicProfile(mechanicProfile);
        request.setStatus(RequestStatus.ACCEPTED);
        request.setAcceptedAt(LocalDateTime.now());

        return serviceRequestRepository.save(request);
    }

    public ServiceRequest rejectRequest(Long requestId) {

        ServiceRequest request = serviceRequestRepository.findById(requestId)
                .orElseThrow(() -> new ResourceNotFoundException("Service request not found"));

        request.setStatus(RequestStatus.REJECTED);

        return serviceRequestRepository.save(request);
    }

    public ServiceRequest updateStatus(Long requestId, RequestStatus status) {

        ServiceRequest request = serviceRequestRepository.findById(requestId)
                .orElseThrow(() -> new ResourceNotFoundException("Service request not found"));

        request.setStatus(status);

        if (status == RequestStatus.COMPLETED) {
            request.setCompletedAt(LocalDateTime.now());
        }

        return serviceRequestRepository.save(request);
    }

    public List<ServiceRequest> getMechanicJobs(Long mechanicProfileId) {
        return serviceRequestRepository.findByMechanicProfileId(mechanicProfileId);
    }
}