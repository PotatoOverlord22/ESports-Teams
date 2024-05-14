package com.emp.esports.utils;

import com.emp.esports.dtos.AddPlayerDTO;
import com.emp.esports.models.entities.Player;

public class Converter {
    public static AddPlayerDTO convertPlayerToAddPlayerDTO(Player player, Integer teamId) {
        return new AddPlayerDTO(player.getName(), player.getKda(), player.getPosition(), teamId);
    }
}
