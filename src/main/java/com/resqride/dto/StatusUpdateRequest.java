package com.resqride.dto;

import com.resqride.model.RequestStatus;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class StatusUpdateRequest {

    @NotNull
    private RequestStatus status;
}