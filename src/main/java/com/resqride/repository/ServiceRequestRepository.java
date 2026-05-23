package com.resqride.repository;

import com.resqride.entity.ServiceRequest;
import com.resqride.model.RequestStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ServiceRequestRepository extends JpaRepository<ServiceRequest, Long> {

    List<ServiceRequest> findByUserId(Long userId);

    List<ServiceRequest> findByMechanicId(Long mechanicId);

    List<ServiceRequest> findByStatus(RequestStatus status);

    long countByStatus(RequestStatus status);
}