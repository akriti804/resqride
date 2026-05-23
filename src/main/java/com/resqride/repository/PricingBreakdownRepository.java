package com.resqride.repository;

import com.resqride.model.PricingBreakdown;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PricingBreakdownRepository extends JpaRepository<PricingBreakdown, Long> {
    Optional<PricingBreakdown> findByServiceRequestId(Long serviceRequestId);
}