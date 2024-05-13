package com.emp.esports.services;

import com.emp.esports.models.entities.Player;
import com.emp.esports.models.entities.Team;
import com.emp.esports.models.exceptions.NotFound;
import com.emp.esports.repositories.PlayerRepository;
import com.emp.esports.repositories.TeamRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class PlayerService {
    private final PlayerRepository playerRepository;
    private final TeamRepository teamRepository;

    public PlayerService(PlayerRepository playerRepository, TeamRepository teamRepository) {
        this.playerRepository = playerRepository;
        this.teamRepository = teamRepository;
    }

    public Player addPlayer(Player player) {
        player.setId(getFreeId());
        playerRepository.save(player);
        return player;
    }

    public void deletePlayer(Integer id) throws NotFound {
        if (!playerRepository.existsById(id))
            throw new NotFound("Could not find player with id " + id);
        playerRepository.deleteById(id);
    }

    public Player addNewPlayerToTeam(Player player, Integer teamId) throws NotFound{

        if(teamRepository.findById(teamId).isEmpty()){
            throw new NotFound("Team with id " + teamId + " not found");
        }
        player.setTeam(teamRepository.findById(teamId).get());
        return playerRepository.save(player);
    }

    public List<Player> getAllPlayers() {
        return playerRepository.findAll();
    }

    public Player getPlayerById(Integer id) throws NotFound {
        Optional<Player> maybePlayer = playerRepository.findById(id);
        if (maybePlayer.isPresent()) {
            return maybePlayer.get();
        }
        throw new NotFound("Could not find player with id " + id);
    }


    public List<Player> getAllPlayersByTeamId(Integer id) {
        return playerRepository.findAllByTeamId(id);
    }

    private Integer getFreeId() {
        List<Player> allPlayers = playerRepository.findAll();
        Integer maxId = allPlayers.stream()
                .map(Player::getId)
                .max(Integer::compareTo)
                .orElse(0);
        return maxId + 1;
    }

    public Player updatePlayer(Integer id, Player updatedPlayer) throws NotFound {
        Optional<Player> maybePlayer = playerRepository.findById(id);
        if (maybePlayer.isPresent()) {
            // TODO validation
            Player player = maybePlayer.get();
            player.setName(updatedPlayer.getName());
            player.setKda(updatedPlayer.getKda());
            player.setPosition(updatedPlayer.getPosition());

            playerRepository.save(player);
            return player;
        }
        throw new NotFound("Could not find team with id " + id);
    }

    public Page<Player> getPlayers(int pageNumber, int pageSize) {
        Pageable pageRequest = PageRequest.of(pageNumber, pageSize);
        return playerRepository.findAll(pageRequest);
    }

}
