package com.resqride.controller;

import com.resqride.model.EmergencyPremiumPlan;
import com.resqride.service.EmergencyPremiumPlanService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/emergency-plans")
@CrossOrigin(origins = "*")
public class EmergencyPremiumPlanController {

    private final EmergencyPremiumPlanService planService;

    public EmergencyPremiumPlanController(EmergencyPremiumPlanService planService) {
        this.planService = planService;
    }

    @PostMapping("/user/{userId}")
    public EmergencyPremiumPlan subscribe(
            @PathVariable Long userId,
            @RequestParam String planName
    ) {
        return planService.subscribe(userId, planName);
    }

    @GetMapping("/user/{userId}/active")
    public EmergencyPremiumPlan getActivePlan(@PathVariable Long userId) {
        return planService.getActivePlan(userId);
    }

    @GetMapping("/user/{userId}/history")
    public List<EmergencyPremiumPlan> getPlanHistory(@PathVariable Long userId) {
        return planService.getPlanHistory(userId);
    }

    @GetMapping("/admin/all")
    public List<EmergencyPremiumPlan> getAllPlans() {
        return planService.getAllPlans();
    }
}