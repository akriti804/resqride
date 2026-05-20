package com.resqride.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class AdminDashboardResponse {

    private Long totalUsers;
    private Long totalMechanics;
    private Long verifiedMechanics;
    private Long pendingMechanics;
    private Long totalRequests;
    private Long pendingRequests;
    private Long completedRequests;
    private Long cancelledRequests;
    private Double estimatedRevenue;
}