package com.resqride.repository;

import com.resqride.model.EmergencyPremiumPlan;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface EmergencyPremiumPlanRepository extends JpaRepository<EmergencyPremiumPlan, Long> {

    Optional<EmergencyPremiumPlan> findByUserIdAndActiveTrue(Long userId);

    List<EmergencyPremiumPlan> findByUserId(Long userId);
}