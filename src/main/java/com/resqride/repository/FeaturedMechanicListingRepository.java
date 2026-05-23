package com.resqride.repository;

import com.resqride.model.FeaturedMechanicListing;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FeaturedMechanicListingRepository extends JpaRepository<FeaturedMechanicListing, Long> {

    Optional<FeaturedMechanicListing> findByMechanicIdAndActiveTrue(Long mechanicId);

    List<FeaturedMechanicListing> findByMechanicId(Long mechanicId);

    List<FeaturedMechanicListing> findByActiveTrueOrderByRankingBoostDesc();
}