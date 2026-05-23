package com.resqride.controller;

import com.resqride.model.PricingBreakdown;
import com.resqride.service.PricingService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/pricing")
@CrossOrigin(origins = "*")
public class PricingController {

    private final PricingService pricingService;

    public PricingController(PricingService pricingService) {
        this.pricingService = pricingService;
    }

    @PostMapping("/calculate")
    public PricingBreakdown calculatePricing(
            @RequestParam Long serviceRequestId,
            @RequestParam Double basePrice
    ) {
        return pricingService.calculatePricing(serviceRequestId, basePrice);
    }

    @PutMapping("/cancel/{serviceRequestId}")
    public PricingBreakdown applyCancellationFee(@PathVariable Long serviceRequestId) {
        return pricingService.applyCancellationFee(serviceRequestId);
    }

    @PutMapping("/paid/{serviceRequestId}")
    public PricingBreakdown markPaid(@PathVariable Long serviceRequestId) {
        return pricingService.markPaid(serviceRequestId);
    }
}