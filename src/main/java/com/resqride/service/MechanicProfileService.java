package com.resqride.service;

import com.resqride.dto.MechanicProfileRequest;
import com.resqride.exception.BadRequestException;
import com.resqride.exception.ResourceNotFoundException;
import com.resqride.model.MechanicProfile;
import com.resqride.model.Role;
import com.resqride.model.User;
import com.resqride.repository.MechanicProfileRepository;
import com.resqride.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MechanicProfileService {

    private final MechanicProfileRepository mechanicProfileRepository;
    private final UserRepository userRepository;

    public MechanicProfile createProfile(Long userId, MechanicProfileRequest request) {

        if (mechanicProfileRepository.existsByUserId(userId)) {
            throw new BadRequestException("Mechanic profile already exists for this user");
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        user.setRole(Role.MECHANIC);
        userRepository.save(user);

        MechanicProfile profile = MechanicProfile.builder()
                .garageName(request.getGarageName())
                .experience(request.getExperience())
                .servicesOffered(request.getServicesOffered())
                .basePrice(request.getBasePrice())
                .location(request.getLocation())
                .latitude(request.getLatitude())
                .longitude(request.getLongitude())
                .available(request.getAvailable() == null ? true : request.getAvailable())
                .verified(false)
                .rating(0.0)
                .user(user)
                .build();

        return mechanicProfileRepository.save(profile);
    }

    public MechanicProfile getProfileByUserId(Long userId) {
        return mechanicProfileRepository.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Mechanic profile not found"));
    }

    public List<MechanicProfile> getAvailableVerifiedMechanics() {
        return mechanicProfileRepository.findByAvailableTrueAndVerifiedTrue();
    }

    public List<MechanicProfile> getPendingMechanics() {
        return mechanicProfileRepository.findByVerifiedFalse();
    }

    public MechanicProfile verifyMechanic(Long mechanicProfileId) {
        MechanicProfile profile = mechanicProfileRepository.findById(mechanicProfileId)
                .orElseThrow(() -> new ResourceNotFoundException("Mechanic profile not found"));

        profile.setVerified(true);
        return mechanicProfileRepository.save(profile);
    }

    public MechanicProfile updateAvailability(Long userId, Boolean available) {
        MechanicProfile profile = mechanicProfileRepository.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Mechanic profile not found"));

        profile.setAvailable(available);
        return mechanicProfileRepository.save(profile);
    }

    public MechanicProfile updateProfile(Long mechanicProfileId, MechanicProfileRequest request) {

        MechanicProfile profile = mechanicProfileRepository.findById(mechanicProfileId)
                .orElseThrow(() -> new ResourceNotFoundException("Mechanic profile not found"));

        profile.setGarageName(request.getGarageName());
        profile.setExperience(request.getExperience());
        profile.setServicesOffered(request.getServicesOffered());
        profile.setBasePrice(request.getBasePrice());
        profile.setLocation(request.getLocation());
        profile.setLatitude(request.getLatitude());
        profile.setLongitude(request.getLongitude());

        if (request.getAvailable() != null) {
            profile.setAvailable(request.getAvailable());
        }

        return mechanicProfileRepository.save(profile);
    }

    public void deleteProfile(Long mechanicProfileId) {

        MechanicProfile profile = mechanicProfileRepository.findById(mechanicProfileId)
                .orElseThrow(() -> new ResourceNotFoundException("Mechanic profile not found"));

        mechanicProfileRepository.delete(profile);
    }
}