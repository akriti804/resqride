package com.resqride.repository;

import com.resqride.model.RequestStatus;
import com.resqride.model.ServiceRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ServiceRequestRepository extends JpaRepository<ServiceRequest, Long> {

    List<ServiceRequest> findByUserId(Long userId);

    List<ServiceRequest> findByMechanicProfileId(Long mechanicProfileId);

    List<ServiceRequest> findByStatus(RequestStatus status);

    long countByStatus(RequestStatus status);
}