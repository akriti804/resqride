package com.resqride.repository;

import com.resqride.model.MechanicSubscription;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MechanicSubscriptionRepository extends JpaRepository<MechanicSubscription, Long> {

    Optional<MechanicSubscription> findByMechanicIdAndActiveTrue(Long mechanicId);

    List<MechanicSubscription> findByMechanicId(Long mechanicId);
}