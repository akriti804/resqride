package com.resqride.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "mechanic_profiles")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MechanicProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String garageName;

    private String experience;

    @Column(length = 1000)
    private String servicesOffered;

    private Double basePrice;

    private String location;

    private Double latitude;

    private Double longitude;

    private Double rating;

    private Boolean available;

    private Boolean verified;

    private LocalDateTime createdAt;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    @PrePersist
    public void onCreate() {
        this.createdAt = LocalDateTime.now();

        if (this.rating == null) {
            this.rating = 0.0;
        }

        if (this.available == null) {
            this.available = true;
        }

        if (this.verified == null) {
            this.verified = false;
        }
    }
}