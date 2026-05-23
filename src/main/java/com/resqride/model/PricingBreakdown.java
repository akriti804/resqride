package com.resqride.model;

import jakarta.persistence.*;

@Entity
@Table(name = "pricing_breakdowns")
public class PricingBreakdown {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long serviceRequestId;

    private Double basePrice;
    private Double platformCommission;
    private Double mechanicEarning;
    private Double cancellationFee;

    private String paymentStatus; // PENDING, PAID, CANCELLED

    public PricingBreakdown() {}

    public PricingBreakdown(Long serviceRequestId, Double basePrice, Double platformCommission,
                            Double mechanicEarning, Double cancellationFee, String paymentStatus) {
        this.serviceRequestId = serviceRequestId;
        this.basePrice = basePrice;
        this.platformCommission = platformCommission;
        this.mechanicEarning = mechanicEarning;
        this.cancellationFee = cancellationFee;
        this.paymentStatus = paymentStatus;
    }

    public Long getId() {
        return id;
    }

    public Long getServiceRequestId() {
        return serviceRequestId;
    }

    public void setServiceRequestId(Long serviceRequestId) {
        this.serviceRequestId = serviceRequestId;
    }

    public Double getBasePrice() {
        return basePrice;
    }

    public void setBasePrice(Double basePrice) {
        this.basePrice = basePrice;
    }

    public Double getPlatformCommission() {
        return platformCommission;
    }

    public void setPlatformCommission(Double platformCommission) {
        this.platformCommission = platformCommission;
    }

    public Double getMechanicEarning() {
        return mechanicEarning;
    }

    public void setMechanicEarning(Double mechanicEarning) {
        this.mechanicEarning = mechanicEarning;
    }

    public Double getCancellationFee() {
        return cancellationFee;
    }

    public void setCancellationFee(Double cancellationFee) {
        this.cancellationFee = cancellationFee;
    }

    public String getPaymentStatus() {
        return paymentStatus;
    }

    public void setPaymentStatus(String paymentStatus) {
        this.paymentStatus = paymentStatus;
    }
}