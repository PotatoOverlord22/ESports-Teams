package com.emp.esports.models.validators;

import com.emp.esports.models.entities.Team;
import com.emp.esports.models.exceptions.BadField;

public class TeamValidation {
    public static void validate(Team teamToValidate) throws BadField {
        if (teamToValidate.getName().isEmpty())
            throw new BadField("Team name is empty");
        if (teamToValidate.getName().length() < 3 || teamToValidate.getName().length() > 64)
            throw new BadField("Team name must be between 3 and 64 characters");
        if (teamToValidate.getPlayers().size() > 20)
            throw new BadField("Exceeded maximum amount of players");
        if (teamToValidate.getRegion().isEmpty())
            throw new BadField("Team must operate in a valid region");
    }
}
