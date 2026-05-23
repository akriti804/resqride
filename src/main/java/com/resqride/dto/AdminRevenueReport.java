package com.resqride.dto;

public class AdminRevenueReport {

    private Double totalServiceRevenue;
    private Double totalPlatformCommission;
    private Double totalMechanicEarnings;
    private Double totalCancellationFees;
    private Double totalSubscriptionRevenue;
    private Double totalEmergencyPlanRevenue;
    private Double totalFeaturedListingRevenue;
    private Double totalBusinessRevenue;

    public AdminRevenueReport() {}

    public AdminRevenueReport(Double totalServiceRevenue,
                              Double totalPlatformCommission,
                              Double totalMechanicEarnings,
                              Double totalCancellationFees,
                              Double totalSubscriptionRevenue,
                              Double totalEmergencyPlanRevenue,
                              Double totalFeaturedListingRevenue,
                              Double totalBusinessRevenue) {
        this.totalServiceRevenue = totalServiceRevenue;
        this.totalPlatformCommission = totalPlatformCommission;
        this.totalMechanicEarnings = totalMechanicEarnings;
        this.totalCancellationFees = totalCancellationFees;
        this.totalSubscriptionRevenue = totalSubscriptionRevenue;
        this.totalEmergencyPlanRevenue = totalEmergencyPlanRevenue;
        this.totalFeaturedListingRevenue = totalFeaturedListingRevenue;
        this.totalBusinessRevenue = totalBusinessRevenue;
    }

    public Double getTotalServiceRevenue() {
        return totalServiceRevenue;
    }

    public void setTotalServiceRevenue(Double totalServiceRevenue) {
        this.totalServiceRevenue = totalServiceRevenue;
    }

    public Double getTotalPlatformCommission() {
        return totalPlatformCommission;
    }

    public void setTotalPlatformCommission(Double totalPlatformCommission) {
        this.totalPlatformCommission = totalPlatformCommission;
    }

    public Double getTotalMechanicEarnings() {
        return totalMechanicEarnings;
    }

    public void setTotalMechanicEarnings(Double totalMechanicEarnings) {
        this.totalMechanicEarnings = totalMechanicEarnings;
    }

    public Double getTotalCancellationFees() {
        return totalCancellationFees;
    }

    public void setTotalCancellationFees(Double totalCancellationFees) {
        this.totalCancellationFees = totalCancellationFees;
    }

    public Double getTotalSubscriptionRevenue() {
        return totalSubscriptionRevenue;
    }

    public void setTotalSubscriptionRevenue(Double totalSubscriptionRevenue) {
        this.totalSubscriptionRevenue = totalSubscriptionRevenue;
    }

    public Double getTotalEmergencyPlanRevenue() {
        return totalEmergencyPlanRevenue;
    }

    public void setTotalEmergencyPlanRevenue(Double totalEmergencyPlanRevenue) {
        this.totalEmergencyPlanRevenue = totalEmergencyPlanRevenue;
    }

    public Double getTotalFeaturedListingRevenue() {
        return totalFeaturedListingRevenue;
    }

    public void setTotalFeaturedListingRevenue(Double totalFeaturedListingRevenue) {
        this.totalFeaturedListingRevenue = totalFeaturedListingRevenue;
    }

    public Double getTotalBusinessRevenue() {
        return totalBusinessRevenue;
    }

    public void setTotalBusinessRevenue(Double totalBusinessRevenue) {
        this.totalBusinessRevenue = totalBusinessRevenue;
    }
}