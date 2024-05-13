package com.emp.esports.services;

import com.emp.esports.models.entities.Player;
import com.emp.esports.models.entities.Team;
import com.emp.esports.models.exceptions.NotFound;
import com.emp.esports.repositories.PlayerRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.*;

public class PlayerServiceTest {

    @Mock
    private PlayerRepository playerRepository;

    @InjectMocks
    private PlayerService playerService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testAddPlayer() {
        Player player = new Player();
        player.setId(1);
        player.setName("Player1");

        when(playerRepository.saveAndFlush(player)).thenReturn(player);

        Player addedPlayer = playerService.addPlayer(player);

        assertThat(addedPlayer).isEqualTo(player);
        verify(playerRepository).saveAndFlush(player);
    }

    @Test
    void testDeletePlayer() throws NotFound {
        int playerIdToDelete = 1;
        Player player = new Player();
        player.setId(playerIdToDelete);

        when(playerRepository.existsById(playerIdToDelete)).thenReturn(true);

        playerService.deletePlayer(playerIdToDelete);

        verify(playerRepository).deleteById(playerIdToDelete);
    }

    @Test
    void testDeletePlayer_NotFound() {
        int nonExistingPlayerId = -1;

        when(playerRepository.existsById(nonExistingPlayerId)).thenReturn(false);

        assertThatThrownBy(() -> playerService.deletePlayer(nonExistingPlayerId))
                .isInstanceOf(NotFound.class);
    }

    @Test
    void testGetPlayerById() throws NotFound {
        int playerId = 1;
        Player player = new Player();
        player.setId(playerId);
        player.setName("Player1");

        when(playerRepository.findById(playerId)).thenReturn(Optional.of(player));

        Player fetchedPlayer = playerService.getPlayerById(playerId);

        assertThat(fetchedPlayer).isEqualTo(player);
    }

    @Test
    void testGetPlayerById_NotFound() {
        int nonExistingPlayerId = -1;

        when(playerRepository.findById(nonExistingPlayerId)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> playerService.getPlayerById(nonExistingPlayerId))
                .isInstanceOf(NotFound.class);
    }

    @Test
    void testGetAllPlayersByTeamId() {
        int teamId = 1;
        Team team = Team.builder()
                .id(teamId)
                .build();

        Player player1 = Player.builder()
                .id(1)
                .name("Player1")
                .team(team)
                .build();

        Player player2 = Player.builder()
                .id(2)
                .name("Player2")
                .team(team)
                .build();

        List<Player> players = Arrays.asList(player1, player2);

        when(playerRepository.findAllByTeamId(teamId)).thenReturn(players);

        List<Player> fetchedPlayers = playerService.getAllPlayersByTeamId(teamId);

        assertThat(fetchedPlayers).hasSize(2);
        assertThat(fetchedPlayers).containsExactly(player1, player2);
    }
}
