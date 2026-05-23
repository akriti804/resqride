package com.resqride.service;

import com.resqride.model.PricingBreakdown;
import com.resqride.repository.PricingBreakdownRepository;
import org.springframework.stereotype.Service;

@Service
public class PricingService {

    private final PricingBreakdownRepository pricingBreakdownRepository;

    public PricingService(PricingBreakdownRepository pricingBreakdownRepository) {
        this.pricingBreakdownRepository = pricingBreakdownRepository;
    }

    public PricingBreakdown calculatePricing(Long serviceRequestId, Double basePrice) {

        double commissionRate = 0.15; // 15%
        double platformCommission = basePrice * commissionRate;
        double mechanicEarning = basePrice - platformCommission;

        PricingBreakdown pricing = new PricingBreakdown(
                serviceRequestId,
                basePrice,
                platformCommission,
                mechanicEarning,
                0.0,
                "PENDING"
        );

        return pricingBreakdownRepository.save(pricing);
    }

    public PricingBreakdown applyCancellationFee(Long serviceRequestId) {

        PricingBreakdown pricing = pricingBreakdownRepository
                .findByServiceRequestId(serviceRequestId)
                .orElseThrow(() -> new RuntimeException("Pricing not found"));

        double cancellationFee = 99.0;

        pricing.setCancellationFee(cancellationFee);
        pricing.setPaymentStatus("CANCELLED");

        return pricingBreakdownRepository.save(pricing);
    }

    public PricingBreakdown markPaid(Long serviceRequestId) {

        PricingBreakdown pricing = pricingBreakdownRepository
                .findByServiceRequestId(serviceRequestId)
                .orElseThrow(() -> new RuntimeException("Pricing not found"));

        pricing.setPaymentStatus("PAID");

        return pricingBreakdownRepository.save(pricing);
    }
}