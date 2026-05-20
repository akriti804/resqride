package com.resqride.service;

import com.resqride.dto.AdminDashboardResponse;
import com.resqride.model.MechanicProfile;
import com.resqride.model.RequestStatus;
import com.resqride.model.ServiceRequest;
import com.resqride.model.User;
import com.resqride.repository.MechanicProfileRepository;
import com.resqride.repository.ServiceRequestRepository;
import com.resqride.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final UserRepository userRepository;
    private final MechanicProfileRepository mechanicProfileRepository;
    private final ServiceRequestRepository serviceRequestRepository;

    public AdminDashboardResponse getDashboardStats() {

        long totalUsers = userRepository.count();
        long totalMechanics = mechanicProfileRepository.count();
        long verifiedMechanics = mechanicProfileRepository.countByVerifiedTrue();
        long pendingMechanics = mechanicProfileRepository.countByVerifiedFalse();
        long totalRequests = serviceRequestRepository.count();
        long pendingRequests = serviceRequestRepository.countByStatus(RequestStatus.PENDING);
        long completedRequests = serviceRequestRepository.countByStatus(RequestStatus.COMPLETED);
        long cancelledRequests = serviceRequestRepository.countByStatus(RequestStatus.CANCELLED);

        double estimatedRevenue = completedRequests * 499.0;

        return AdminDashboardResponse.builder()
                .totalUsers(totalUsers)
                .totalMechanics(totalMechanics)
                .verifiedMechanics(verifiedMechanics)
                .pendingMechanics(pendingMechanics)
                .totalRequests(totalRequests)
                .pendingRequests(pendingRequests)
                .completedRequests(completedRequests)
                .cancelledRequests(cancelledRequests)
                .estimatedRevenue(estimatedRevenue)
                .build();
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public List<MechanicProfile> getAllMechanics() {
        return mechanicProfileRepository.findAll();
    }

    public List<MechanicProfile> getPendingMechanics() {
        return mechanicProfileRepository.findByVerifiedFalse();
    }

    public MechanicProfile verifyMechanic(Long mechanicProfileId) {
        MechanicProfile mechanicProfile = mechanicProfileRepository.findById(mechanicProfileId)
                .orElseThrow(() -> new RuntimeException("Mechanic profile not found"));

        mechanicProfile.setVerified(true);
        return mechanicProfileRepository.save(mechanicProfile);
    }

    public List<ServiceRequest> getAllRequests() {
        return serviceRequestRepository.findAll();
    }
}