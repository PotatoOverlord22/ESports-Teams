package com.emp.esports.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AddPlayerDTO {
    private String name;
    private float kda;
    private String position;
    private int teamId;
}
