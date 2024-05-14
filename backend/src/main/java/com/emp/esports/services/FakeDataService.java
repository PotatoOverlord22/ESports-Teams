package com.emp.esports.services;

import com.emp.esports.models.entities.Player;
import com.emp.esports.models.entities.Team;
import com.emp.esports.models.exceptions.NotFound;
import com.emp.esports.services.PlayerService;
import com.emp.esports.services.TeamService;
import com.emp.esports.utils.Converter;
import com.emp.esports.utils.RandomExistingIdGenerator;
import com.emp.esports.utils.Randomizer;
import com.github.javafaker.Faker;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import static org.aspectj.runtime.internal.Conversions.floatValue;

@Component
@Service
public class FakeDataService {
    private final TeamService teamService;
    private final PlayerService playerService;
    private final Faker faker;
    private final RandomExistingIdGenerator idGenerator;

    public FakeDataService(TeamService teamService, PlayerService playerService) {
        this.teamService = teamService;
        this.playerService = playerService;
        faker = new Faker();
        idGenerator = new RandomExistingIdGenerator();
    }

    @Scheduled(fixedDelay = 20000, initialDelay = 10000) // Execute every 20 seconds with an initial delay of 10 seconds
    public void addFakeTeam() {
        
    }

    @Scheduled(fixedDelay = 10000, initialDelay = 5000) // Execute every 10 seconds with an initial delay of 5 seconds
    public void addFakePlayer() {
        Player fakePlayer = generateFakePlayer();
        try {
            playerService.addNewPlayerToTeam(Converter.convertPlayerToAddPlayerDTO(fakePlayer, idGenerator.getRandomTeamId()));
            System.out.println("Successfully added fake player: " + fakePlayer);
        } catch (NotFound error) {
            System.out.println("Failed adding fake player: " + error);
        }
    }


    public Player generateFakePlayer() {
        String name = faker.esports().player();
        float kda = floatValue(faker.number().randomDouble(6, 0, 5));
        String position = Randomizer.getRandomPosition();
        return Player.builder()
                .name(name)
                .kda(kda)
                .position(position)
                .build();
    }

    public Team generateFakeTeam() {
        String teamName = faker.esports().team();
        String logoUrl = faker.internet().image();
        String region = faker.address().country();
        return Team.builder()
                .name(teamName)
                .logoUrl(logoUrl)
                .region(region)
                .build();
    }
}
