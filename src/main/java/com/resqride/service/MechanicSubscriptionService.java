package com.resqride.service;

import com.resqride.model.MechanicSubscription;
import com.resqride.repository.MechanicSubscriptionRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class MechanicSubscriptionService {

    private final MechanicSubscriptionRepository subscriptionRepository;

    public MechanicSubscriptionService(MechanicSubscriptionRepository subscriptionRepository) {
        this.subscriptionRepository = subscriptionRepository;
    }

    public MechanicSubscription subscribe(Long mechanicId, String planName) {

        subscriptionRepository.findByMechanicIdAndActiveTrue(mechanicId)
                .ifPresent(oldPlan -> {
                    oldPlan.setActive(false);
                    oldPlan.setPaymentStatus("EXPIRED");
                    subscriptionRepository.save(oldPlan);
                });

        MechanicSubscription subscription = new MechanicSubscription();
        subscription.setMechanicId(mechanicId);
        subscription.setPlanName(planName.toUpperCase());
        subscription.setStartDate(LocalDate.now());
        subscription.setEndDate(LocalDate.now().plusMonths(1));
        subscription.setActive(true);
        subscription.setPaymentStatus("PAID");

        switch (planName.toUpperCase()) {
            case "BASIC":
                subscription.setMonthlyPrice(199.0);
                subscription.setPriorityBoost(1);
                break;

            case "PRO":
                subscription.setMonthlyPrice(399.0);
                subscription.setPriorityBoost(3);
                break;

            case "PREMIUM":
                subscription.setMonthlyPrice(799.0);
                subscription.setPriorityBoost(5);
                break;

            default:
                throw new RuntimeException("Invalid subscription plan");
        }

        return subscriptionRepository.save(subscription);
    }

    public MechanicSubscription getActiveSubscription(Long mechanicId) {
        return subscriptionRepository.findByMechanicIdAndActiveTrue(mechanicId)
                .orElseThrow(() -> new RuntimeException("No active subscription found"));
    }

    public List<MechanicSubscription> getSubscriptionHistory(Long mechanicId) {
        return subscriptionRepository.findByMechanicId(mechanicId);
    }

    public List<MechanicSubscription> getAllSubscriptions() {
        return subscriptionRepository.findAll();
    }
}