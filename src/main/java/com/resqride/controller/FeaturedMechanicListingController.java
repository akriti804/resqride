package com.resqride.controller;

import com.resqride.model.FeaturedMechanicListing;
import com.resqride.service.FeaturedMechanicListingService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/featured-mechanics")
@CrossOrigin(origins = "*")
public class FeaturedMechanicListingController {

    private final FeaturedMechanicListingService listingService;

    public FeaturedMechanicListingController(FeaturedMechanicListingService listingService) {
        this.listingService = listingService;
    }

    @PostMapping("/mechanic/{mechanicId}")
    public FeaturedMechanicListing createFeaturedListing(
            @PathVariable Long mechanicId,
            @RequestParam String listingPlan
    ) {
        return listingService.createFeaturedListing(mechanicId, listingPlan);
    }

    @GetMapping("/mechanic/{mechanicId}/active")
    public FeaturedMechanicListing getActiveListing(@PathVariable Long mechanicId) {
        return listingService.getActiveListing(mechanicId);
    }

    @GetMapping("/mechanic/{mechanicId}/history")
    public List<FeaturedMechanicListing> getListingHistory(@PathVariable Long mechanicId) {
        return listingService.getListingHistory(mechanicId);
    }

    @GetMapping("/active")
    public List<FeaturedMechanicListing> getAllActiveFeaturedListings() {
        return listingService.getAllActiveFeaturedListings();
    }

    @GetMapping("/admin/all")
    public List<FeaturedMechanicListing> getAllListings() {
        return listingService.getAllListings();
    }
}