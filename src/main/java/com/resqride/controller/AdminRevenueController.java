package com.resqride.controller;

import com.resqride.dto.AdminRevenueReport;
import com.resqride.service.AdminRevenueService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/revenue")
@CrossOrigin(origins = "*")
public class AdminRevenueController {

    private final AdminRevenueService adminRevenueService;

    public AdminRevenueController(AdminRevenueService adminRevenueService) {
        this.adminRevenueService = adminRevenueService;
    }

    @GetMapping("/report")
    public AdminRevenueReport getRevenueReport() {
        return adminRevenueService.getRevenueReport();
    }
}