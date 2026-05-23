package com.resqride.service;

import com.resqride.model.EmergencyPremiumPlan;
import com.resqride.repository.EmergencyPremiumPlanRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class EmergencyPremiumPlanService {

    private final EmergencyPremiumPlanRepository planRepository;

    public EmergencyPremiumPlanService(EmergencyPremiumPlanRepository planRepository) {
        this.planRepository = planRepository;
    }

    public EmergencyPremiumPlan subscribe(Long userId, String planName) {

        planRepository.findByUserIdAndActiveTrue(userId)
                .ifPresent(oldPlan -> {
                    oldPlan.setActive(false);
                    oldPlan.setPaymentStatus("EXPIRED");
                    planRepository.save(oldPlan);
                });

        EmergencyPremiumPlan plan = new EmergencyPremiumPlan();
        plan.setUserId(userId);
        plan.setPlanName(planName.toUpperCase());
        plan.setStartDate(LocalDate.now());
        plan.setEndDate(LocalDate.now().plusMonths(1));
        plan.setActive(true);
        plan.setPaymentStatus("PAID");

        switch (planName.toUpperCase()) {
            case "BASIC_EMERGENCY":
                plan.setMonthlyPrice(99.0);
                plan.setPriorityLevel(1);
                plan.setFreeEmergencyCalls(1);
                break;

            case "PLUS_EMERGENCY":
                plan.setMonthlyPrice(199.0);
                plan.setPriorityLevel(3);
                plan.setFreeEmergencyCalls(3);
                break;

            case "PREMIUM_EMERGENCY":
                plan.setMonthlyPrice(399.0);
                plan.setPriorityLevel(5);
                plan.setFreeEmergencyCalls(10);
                break;

            default:
                throw new RuntimeException("Invalid emergency plan");
        }

        return planRepository.save(plan);
    }

    public EmergencyPremiumPlan getActivePlan(Long userId) {
        return planRepository.findByUserIdAndActiveTrue(userId)
                .orElseThrow(() -> new RuntimeException("No active emergency plan found"));
    }

    public List<EmergencyPremiumPlan> getPlanHistory(Long userId) {
        return planRepository.findByUserId(userId);
    }

    public List<EmergencyPremiumPlan> getAllPlans() {
        return planRepository.findAll();
    }
}