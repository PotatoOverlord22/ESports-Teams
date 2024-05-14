package com.emp.esports.dtos;

import com.emp.esports.models.entities.Player;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AddTeamDTO {
    private String name;
    private String logoUrl;
    private String region;
    List<Player> players;
}
