package com.resqride.service;

import com.resqride.dto.AdminRevenueReport;
import com.resqride.model.EmergencyPremiumPlan;
import com.resqride.model.FeaturedMechanicListing;
import com.resqride.model.MechanicSubscription;
import com.resqride.model.PricingBreakdown;
import com.resqride.repository.EmergencyPremiumPlanRepository;
import com.resqride.repository.FeaturedMechanicListingRepository;
import com.resqride.repository.MechanicSubscriptionRepository;
import com.resqride.repository.PricingBreakdownRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminRevenueService {

    private final PricingBreakdownRepository pricingBreakdownRepository;
    private final MechanicSubscriptionRepository mechanicSubscriptionRepository;
    private final EmergencyPremiumPlanRepository emergencyPremiumPlanRepository;
    private final FeaturedMechanicListingRepository featuredMechanicListingRepository;

    public AdminRevenueService(PricingBreakdownRepository pricingBreakdownRepository,
                               MechanicSubscriptionRepository mechanicSubscriptionRepository,
                               EmergencyPremiumPlanRepository emergencyPremiumPlanRepository,
                               FeaturedMechanicListingRepository featuredMechanicListingRepository) {
        this.pricingBreakdownRepository = pricingBreakdownRepository;
        this.mechanicSubscriptionRepository = mechanicSubscriptionRepository;
        this.emergencyPremiumPlanRepository = emergencyPremiumPlanRepository;
        this.featuredMechanicListingRepository = featuredMechanicListingRepository;
    }

    public AdminRevenueReport getRevenueReport() {

        List<PricingBreakdown> pricingList = pricingBreakdownRepository.findAll();
        List<MechanicSubscription> subscriptions = mechanicSubscriptionRepository.findAll();
        List<EmergencyPremiumPlan> emergencyPlans = emergencyPremiumPlanRepository.findAll();
        List<FeaturedMechanicListing> featuredListings = featuredMechanicListingRepository.findAll();

        double totalServiceRevenue = pricingList.stream()
                .mapToDouble(item -> item.getBasePrice() != null ? item.getBasePrice() : 0.0)
                .sum();

        double totalPlatformCommission = pricingList.stream()
                .mapToDouble(item -> item.getPlatformCommission() != null ? item.getPlatformCommission() : 0.0)
                .sum();

        double totalMechanicEarnings = pricingList.stream()
                .mapToDouble(item -> item.getMechanicEarning() != null ? item.getMechanicEarning() : 0.0)
                .sum();

        double totalCancellationFees = pricingList.stream()
                .mapToDouble(item -> item.getCancellationFee() != null ? item.getCancellationFee() : 0.0)
                .sum();

        double totalSubscriptionRevenue = subscriptions.stream()
                .filter(item -> "PAID".equalsIgnoreCase(item.getPaymentStatus()))
                .mapToDouble(item -> item.getMonthlyPrice() != null ? item.getMonthlyPrice() : 0.0)
                .sum();

        double totalEmergencyPlanRevenue = emergencyPlans.stream()
                .filter(item -> "PAID".equalsIgnoreCase(item.getPaymentStatus()))
                .mapToDouble(item -> item.getMonthlyPrice() != null ? item.getMonthlyPrice() : 0.0)
                .sum();

        double totalFeaturedListingRevenue = featuredListings.stream()
                .filter(item -> "PAID".equalsIgnoreCase(item.getPaymentStatus()))
                .mapToDouble(item -> item.getPrice() != null ? item.getPrice() : 0.0)
                .sum();

        double totalBusinessRevenue =
                totalPlatformCommission +
                totalCancellationFees +
                totalSubscriptionRevenue +
                totalEmergencyPlanRevenue +
                totalFeaturedListingRevenue;

        return new AdminRevenueReport(
                totalServiceRevenue,
                totalPlatformCommission,
                totalMechanicEarnings,
                totalCancellationFees,
                totalSubscriptionRevenue,
                totalEmergencyPlanRevenue,
                totalFeaturedListingRevenue,
                totalBusinessRevenue
        );
    }
}