package com.emp.esports.utils;

import java.util.Random;

public class Randomizer {
    public static String getRandomPosition(){
        Random random = new Random();
        int randomIndex = random.nextInt(Constants.POSITIONS.length);

        return Constants.POSITIONS[randomIndex];
    }
}
