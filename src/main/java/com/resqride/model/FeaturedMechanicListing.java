package com.resqride.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "featured_mechanic_listings")
public class FeaturedMechanicListing {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long mechanicId;

    private String listingPlan; // FEATURED_7_DAYS, FEATURED_15_DAYS, FEATURED_30_DAYS

    private Double price;

    private LocalDate startDate;
    private LocalDate endDate;

    private Boolean active;

    private Integer rankingBoost;

    private String paymentStatus; // PENDING, PAID, EXPIRED

    public FeaturedMechanicListing() {}

    public Long getId() { return id; }

    public Long getMechanicId() { return mechanicId; }
    public void setMechanicId(Long mechanicId) { this.mechanicId = mechanicId; }

    public String getListingPlan() { return listingPlan; }
    public void setListingPlan(String listingPlan) { this.listingPlan = listingPlan; }

    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }

    public LocalDate getStartDate() { return startDate; }
    public void setStartDate(LocalDate startDate) { this.startDate = startDate; }

    public LocalDate getEndDate() { return endDate; }
    public void setEndDate(LocalDate endDate) { this.endDate = endDate; }

    public Boolean getActive() { return active; }
    public void setActive(Boolean active) { this.active = active; }

    public Integer getRankingBoost() { return rankingBoost; }
    public void setRankingBoost(Integer rankingBoost) { this.rankingBoost = rankingBoost; }

    public String getPaymentStatus() { return paymentStatus; }
    public void setPaymentStatus(String paymentStatus) { this.paymentStatus = paymentStatus; }
}