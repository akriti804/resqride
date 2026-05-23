package com.resqride.service;

import com.resqride.entity.MechanicLocation;
import com.resqride.entity.ServiceRequest;
import com.resqride.repository.MechanicLocationRepository;
import com.resqride.repository.ServiceRequestRepository;
import org.springframework.stereotype.Service;

@Service
public class MechanicLocationService {

    private final MechanicLocationRepository mechanicLocationRepository;
    private final ServiceRequestRepository serviceRequestRepository;

    public MechanicLocationService(
            MechanicLocationRepository mechanicLocationRepository,
            ServiceRequestRepository serviceRequestRepository
    ) {
        this.mechanicLocationRepository = mechanicLocationRepository;
        this.serviceRequestRepository = serviceRequestRepository;
    }

    public MechanicLocation updateLocation(MechanicLocation locationRequest) {
        MechanicLocation location = mechanicLocationRepository
                .findByMechanicId(locationRequest.getMechanicId())
                .orElse(new MechanicLocation());

        location.setMechanicId(locationRequest.getMechanicId());
        location.setLatitude(locationRequest.getLatitude());
        location.setLongitude(locationRequest.getLongitude());

        return mechanicLocationRepository.save(location);
    }

    public MechanicLocation getMechanicLocation(Long mechanicId) {
        return mechanicLocationRepository.findByMechanicId(mechanicId)
                .orElseThrow(() -> new RuntimeException("Mechanic location not found"));
    }

    public MechanicLocation getLocationByRequestId(Long requestId) {
        ServiceRequest request = serviceRequestRepository.findById(requestId)
                .orElseThrow(() -> new RuntimeException("Service request not found"));

        if (request.getMechanicId() == null) {
            throw new RuntimeException("Mechanic not assigned yet");
        }

        return getMechanicLocation(request.getMechanicId());
    }
}