package com.emp.esports.models.validators;

import com.emp.esports.models.entities.Team;
import com.emp.esports.models.exceptions.BadField;

public class TeamValidation {
    public static void validate(Team teamToValidate) throws BadField {
        if (teamToValidate.getName().isEmpty())
            throw new BadField("Team name is empty");

    }
}
