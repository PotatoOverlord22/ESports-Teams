package com.emp.esports.services;

import com.emp.esports.models.entities.Player;
import com.emp.esports.models.entities.Team;
import com.emp.esports.models.exceptions.NotFound;
import com.emp.esports.models.validators.TeamValidation;
import com.emp.esports.repositories.TeamRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TeamService {
    private final TeamRepository teamRepository;

    public TeamService(TeamRepository teamRepository) {
        this.teamRepository = teamRepository;
    }

    public Team addTeam(Team team) {
        // TODO validation
        teamRepository.save(team);
        return team;
    }

    public void deleteTeam(Integer id) throws NotFound {
        if (!teamRepository.existsById(id))
            throw new NotFound("Could not find team with id " + id);
        teamRepository.deleteById(id);
    }

    public Team getTeamById(Integer id) throws NotFound {
        Optional<Team> maybeTeam = teamRepository.findById(id);
        if (maybeTeam.isPresent()) {
            return maybeTeam.get();
        }
        throw new NotFound("Could not find team with id " + id);
    }

    public List<Team> getAllTeams() {
        return teamRepository.findAll();
    }

    public Team updateTeam(Integer id, Team updatedTeam) throws NotFound {
        Optional<Team> maybeTeam = teamRepository.findById(id);
        if (maybeTeam.isPresent()) {
            // TODO validation
            Team team = maybeTeam.get();
            team.setName(updatedTeam.getName());
            team.setLogoUrl(updatedTeam.getLogoUrl());
            team.setRegion(updatedTeam.getRegion());

            teamRepository.save(team);
            return team;
        }
        throw new NotFound("Could not find team with id " + id);
    }

    public List<Player> getAllPlayersByTeamId(Integer id) throws NotFound {
        Optional<Team> maybeTeam = teamRepository.findById(id);
        if (maybeTeam.isPresent()) {
            return maybeTeam.get().getPlayers();
        }
        throw new NotFound("Could not find team with id " + id);
    }

    public Page<Team> getFilteredTeamsByPage(int pageNumber, int pageSize, String region) {
        Pageable pageRequest = PageRequest.of(pageNumber, pageSize);
        return teamRepository.findByRegion(region, pageRequest);
    }
}
