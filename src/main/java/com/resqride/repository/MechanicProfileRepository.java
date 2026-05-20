package com.resqride.repository;

import com.resqride.model.MechanicProfile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MechanicProfileRepository extends JpaRepository<MechanicProfile, Long> {

    Optional<MechanicProfile> findByUserId(Long userId);

    boolean existsByUserId(Long userId);

    List<MechanicProfile> findByAvailableTrueAndVerifiedTrue();

    List<MechanicProfile> findByVerifiedFalse();

    long countByVerifiedTrue();

    long countByVerifiedFalse();
}