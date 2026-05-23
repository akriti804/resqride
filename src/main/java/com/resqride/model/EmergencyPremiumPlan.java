package com.resqride.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "emergency_premium_plans")
public class EmergencyPremiumPlan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;

    private String planName;
    private Double monthlyPrice;

    private LocalDate startDate;
    private LocalDate endDate;

    private Boolean active;
    private Integer priorityLevel;
    private Integer freeEmergencyCalls;

    private String paymentStatus;

    public EmergencyPremiumPlan() {}

    public Long getId() { return id; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public String getPlanName() { return planName; }
    public void setPlanName(String planName) { this.planName = planName; }

    public Double getMonthlyPrice() { return monthlyPrice; }
    public void setMonthlyPrice(Double monthlyPrice) { this.monthlyPrice = monthlyPrice; }

    public LocalDate getStartDate() { return startDate; }
    public void setStartDate(LocalDate startDate) { this.startDate = startDate; }

    public LocalDate getEndDate() { return endDate; }
    public void setEndDate(LocalDate endDate) { this.endDate = endDate; }

    public Boolean getActive() { return active; }
    public void setActive(Boolean active) { this.active = active; }

    public Integer getPriorityLevel() { return priorityLevel; }
    public void setPriorityLevel(Integer priorityLevel) { this.priorityLevel = priorityLevel; }

    public Integer getFreeEmergencyCalls() { return freeEmergencyCalls; }
    public void setFreeEmergencyCalls(Integer freeEmergencyCalls) { this.freeEmergencyCalls = freeEmergencyCalls; }

    public String getPaymentStatus() { return paymentStatus; }
    public void setPaymentStatus(String paymentStatus) { this.paymentStatus = paymentStatus; }
}