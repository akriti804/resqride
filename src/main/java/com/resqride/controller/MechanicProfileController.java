package com.resqride.controller;

import com.resqride.dto.ApiResponse;
import com.resqride.dto.MechanicProfileRequest;
import com.resqride.model.MechanicProfile;
import com.resqride.service.MechanicProfileService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/mechanics")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class MechanicProfileController {

    private final MechanicProfileService mechanicProfileService;

    @PostMapping("/profile/{userId}")
    public ApiResponse<MechanicProfile> createProfile(
            @PathVariable Long userId,
            @Valid @RequestBody MechanicProfileRequest request
    ) {
        MechanicProfile profile = mechanicProfileService.createProfile(userId, request);

        return ApiResponse.<MechanicProfile>builder()
                .success(true)
                .message("Mechanic profile created successfully")
                .data(profile)
                .build();
    }

    @GetMapping("/profile/{userId}")
    public ApiResponse<MechanicProfile> getProfile(@PathVariable Long userId) {
        MechanicProfile profile = mechanicProfileService.getProfileByUserId(userId);

        return ApiResponse.<MechanicProfile>builder()
                .success(true)
                .message("Mechanic profile fetched successfully")
                .data(profile)
                .build();
    }

    @GetMapping("/available")
    public ApiResponse<List<MechanicProfile>> getAvailableMechanics() {
        List<MechanicProfile> mechanics = mechanicProfileService.getAvailableVerifiedMechanics();

        return ApiResponse.<List<MechanicProfile>>builder()
                .success(true)
                .message("Available verified mechanics fetched successfully")
                .data(mechanics)
                .build();
    }

    @GetMapping("/pending")
    public ApiResponse<List<MechanicProfile>> getPendingMechanics() {
        List<MechanicProfile> mechanics = mechanicProfileService.getPendingMechanics();

        return ApiResponse.<List<MechanicProfile>>builder()
                .success(true)
                .message("Pending mechanics fetched successfully")
                .data(mechanics)
                .build();
    }

    @PutMapping("/verify/{mechanicProfileId}")
    public ApiResponse<MechanicProfile> verifyMechanic(@PathVariable Long mechanicProfileId) {
        MechanicProfile profile = mechanicProfileService.verifyMechanic(mechanicProfileId);

        return ApiResponse.<MechanicProfile>builder()
                .success(true)
                .message("Mechanic verified successfully")
                .data(profile)
                .build();
    }

    @PutMapping("/availability/{userId}")
    public ApiResponse<MechanicProfile> updateAvailability(
            @PathVariable Long userId,
            @RequestParam Boolean available
    ) {
        MechanicProfile profile = mechanicProfileService.updateAvailability(userId, available);

        return ApiResponse.<MechanicProfile>builder()
                .success(true)
                .message("Mechanic availability updated successfully")
                .data(profile)
                .build();
    }

    @PutMapping("/profile/update/{mechanicProfileId}")
    public ApiResponse<MechanicProfile> updateProfile(
            @PathVariable Long mechanicProfileId,
            @Valid @RequestBody MechanicProfileRequest request
    ) {
        MechanicProfile profile = mechanicProfileService.updateProfile(mechanicProfileId, request);

        return ApiResponse.<MechanicProfile>builder()
                .success(true)
                .message("Mechanic profile updated successfully")
                .data(profile)
                .build();
    }

    @DeleteMapping("/profile/delete/{mechanicProfileId}")
    public ApiResponse<String> deleteProfile(@PathVariable Long mechanicProfileId) {
        mechanicProfileService.deleteProfile(mechanicProfileId);

        return ApiResponse.<String>builder()
                .success(true)
                .message("Mechanic profile deleted successfully")
                .data("Deleted mechanic profile ID: " + mechanicProfileId)
                .build();
    }
}