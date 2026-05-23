package com.resqride.repository;

import com.resqride.entity.MechanicLocation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MechanicLocationRepository extends JpaRepository<MechanicLocation, Long> {

    Optional<MechanicLocation> findByMechanicId(Long mechanicId);
}