package com.resqride.controller;

import com.resqride.model.MechanicSubscription;
import com.resqride.service.MechanicSubscriptionService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/subscriptions")
@CrossOrigin(origins = "*")
public class MechanicSubscriptionController {

    private final MechanicSubscriptionService subscriptionService;

    public MechanicSubscriptionController(MechanicSubscriptionService subscriptionService) {
        this.subscriptionService = subscriptionService;
    }

    @PostMapping("/mechanic/{mechanicId}")
    public MechanicSubscription subscribe(
            @PathVariable Long mechanicId,
            @RequestParam String planName
    ) {
        return subscriptionService.subscribe(mechanicId, planName);
    }

    @GetMapping("/mechanic/{mechanicId}/active")
    public MechanicSubscription getActiveSubscription(@PathVariable Long mechanicId) {
        return subscriptionService.getActiveSubscription(mechanicId);
    }

    @GetMapping("/mechanic/{mechanicId}/history")
    public List<MechanicSubscription> getSubscriptionHistory(@PathVariable Long mechanicId) {
        return subscriptionService.getSubscriptionHistory(mechanicId);
    }

    @GetMapping("/admin/all")
    public List<MechanicSubscription> getAllSubscriptions() {
        return subscriptionService.getAllSubscriptions();
    }
}