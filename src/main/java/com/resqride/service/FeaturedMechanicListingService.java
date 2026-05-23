package com.resqride.service;

import com.resqride.model.FeaturedMechanicListing;
import com.resqride.repository.FeaturedMechanicListingRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class FeaturedMechanicListingService {

    private final FeaturedMechanicListingRepository listingRepository;

    public FeaturedMechanicListingService(FeaturedMechanicListingRepository listingRepository) {
        this.listingRepository = listingRepository;
    }

    public FeaturedMechanicListing createFeaturedListing(Long mechanicId, String listingPlan) {

        listingRepository.findByMechanicIdAndActiveTrue(mechanicId)
                .ifPresent(oldListing -> {
                    oldListing.setActive(false);
                    oldListing.setPaymentStatus("EXPIRED");
                    listingRepository.save(oldListing);
                });

        FeaturedMechanicListing listing = new FeaturedMechanicListing();
        listing.setMechanicId(mechanicId);
        listing.setListingPlan(listingPlan.toUpperCase());
        listing.setStartDate(LocalDate.now());
        listing.setActive(true);
        listing.setPaymentStatus("PAID");

        switch (listingPlan.toUpperCase()) {
            case "FEATURED_7_DAYS":
                listing.setPrice(149.0);
                listing.setEndDate(LocalDate.now().plusDays(7));
                listing.setRankingBoost(3);
                break;

            case "FEATURED_15_DAYS":
                listing.setPrice(249.0);
                listing.setEndDate(LocalDate.now().plusDays(15));
                listing.setRankingBoost(5);
                break;

            case "FEATURED_30_DAYS":
                listing.setPrice(399.0);
                listing.setEndDate(LocalDate.now().plusDays(30));
                listing.setRankingBoost(10);
                break;

            default:
                throw new RuntimeException("Invalid featured listing plan");
        }

        return listingRepository.save(listing);
    }

    public FeaturedMechanicListing getActiveListing(Long mechanicId) {
        return listingRepository.findByMechanicIdAndActiveTrue(mechanicId)
                .orElseThrow(() -> new RuntimeException("No active featured listing found"));
    }

    public List<FeaturedMechanicListing> getListingHistory(Long mechanicId) {
        return listingRepository.findByMechanicId(mechanicId);
    }

    public List<FeaturedMechanicListing> getAllActiveFeaturedListings() {
        return listingRepository.findByActiveTrueOrderByRankingBoostDesc();
    }

    public List<FeaturedMechanicListing> getAllListings() {
        return listingRepository.findAll();
    }
}