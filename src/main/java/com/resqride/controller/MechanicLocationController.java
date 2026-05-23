package com.resqride.controller;

import com.resqride.entity.MechanicLocation;
import com.resqride.service.MechanicLocationService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/location")
@CrossOrigin(origins = "*")
public class MechanicLocationController {

    private final MechanicLocationService mechanicLocationService;

    public MechanicLocationController(MechanicLocationService mechanicLocationService) {
        this.mechanicLocationService = mechanicLocationService;
    }

    @PostMapping("/update")
    public MechanicLocation updateLocation(@RequestBody MechanicLocation locationRequest) {
        return mechanicLocationService.updateLocation(locationRequest);
    }

    @GetMapping("/mechanic/{mechanicId}")
    public MechanicLocation getMechanicLocation(@PathVariable Long mechanicId) {
        return mechanicLocationService.getMechanicLocation(mechanicId);
    }

    @GetMapping("/request/{requestId}")
    public MechanicLocation getLocationByRequestId(@PathVariable Long requestId) {
        return mechanicLocationService.getLocationByRequestId(requestId);
    }
}