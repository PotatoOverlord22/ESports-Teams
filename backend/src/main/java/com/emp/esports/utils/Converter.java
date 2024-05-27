package com.emp.esports.utils;

import com.emp.esports.dtos.AddPlayerDTO;
import com.emp.esports.dtos.AddTeamDTO;
import com.emp.esports.models.entities.Player;
import com.emp.esports.models.entities.Team;

public class Converter {
    public static AddPlayerDTO convertPlayerToAddPlayerDTO(Player player, Integer teamId) {
        return new AddPlayerDTO(player.getName(), player.getKda(), player.getPosition(), teamId);
    }

    public static AddTeamDTO convertTeamToAddTeamDTO(Team team){
        return new AddTeamDTO(team.getName(), team.getLogoUrl(), team.getRegion(), team.getPlayers());
    }
}
