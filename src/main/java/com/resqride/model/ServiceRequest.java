package com.resqride.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "service_requests")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ServiceRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private ServiceType serviceType;

    @Column(length = 1000)
    private String issueDescription;

    private String breakdownLocation;

    private Double latitude;

    private Double longitude;

    @Enumerated(EnumType.STRING)
    private RequestStatus status;

    private Double estimatedPrice;

    private LocalDateTime createdAt;

    private LocalDateTime acceptedAt;

    private LocalDateTime completedAt;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "vehicle_id")
    private Vehicle vehicle;

    @ManyToOne
    @JoinColumn(name = "mechanic_profile_id")
    private MechanicProfile mechanicProfile;

    @PrePersist
    public void onCreate() {
        this.createdAt = LocalDateTime.now();

        if (this.status == null) {
            this.status = RequestStatus.PENDING;
        }
    }
}