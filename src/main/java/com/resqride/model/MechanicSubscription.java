package com.resqride.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "mechanic_subscriptions")
public class MechanicSubscription {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long mechanicId;

    private String planName; // BASIC, PRO, PREMIUM

    private Double monthlyPrice;

    private LocalDate startDate;

    private LocalDate endDate;

    private Boolean active;

    private Integer priorityBoost;

    private String paymentStatus; // PENDING, PAID, EXPIRED

    public MechanicSubscription() {}

    public Long getId() {
        return id;
    }

    public Long getMechanicId() {
        return mechanicId;
    }

    public void setMechanicId(Long mechanicId) {
        this.mechanicId = mechanicId;
    }

    public String getPlanName() {
        return planName;
    }

    public void setPlanName(String planName) {
        this.planName = planName;
    }

    public Double getMonthlyPrice() {
        return monthlyPrice;
    }

    public void setMonthlyPrice(Double monthlyPrice) {
        this.monthlyPrice = monthlyPrice;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public Integer getPriorityBoost() {
        return priorityBoost;
    }

    public void setPriorityBoost(Integer priorityBoost) {
        this.priorityBoost = priorityBoost;
    }

    public String getPaymentStatus() {
        return paymentStatus;
    }

    public void setPaymentStatus(String paymentStatus) {
        this.paymentStatus = paymentStatus;
    }
}