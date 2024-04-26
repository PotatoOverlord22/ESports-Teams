package com.emp.esports.models.validators;

import com.emp.esports.models.entities.Player;
import com.emp.esports.models.exceptions.BadField;

public class PlayerValidation {
    public static void validate(Player player) throws BadField {
        if (player.getName().length() < 2 || player.getName().length() > 64)
            throw new BadField("Player name must be between 2 and 64 characters");
        if (player.getKda() < 0)
            throw new BadField("Player kda must be bigger than 0");
        if (player.getPosition().length() > 64)
            throw new BadField("Player position must be less than 64 characters");
    }
}
