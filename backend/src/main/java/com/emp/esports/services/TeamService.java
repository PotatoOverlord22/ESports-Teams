package com.emp.esports.services;

import com.emp.esports.dtos.AddTeamDTO;
import com.emp.esports.models.entities.Player;
import com.emp.esports.models.entities.Team;
import com.emp.esports.models.exceptions.BadField;
import com.emp.esports.models.exceptions.NotFound;
import com.emp.esports.models.validators.TeamValidation;
import com.emp.esports.repositories.TeamRepository;
import com.emp.esports.utils.events.TeamAddedEvent;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.xml.validation.Validator;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TeamService {
    private final TeamRepository teamRepository;
    private final ApplicationEventPublisher eventPublisher;

    public TeamService(TeamRepository teamRepository, ApplicationEventPublisher eventPublisher) {
        this.teamRepository = teamRepository;
        this.eventPublisher = eventPublisher;
    }

    public Team addTeam(AddTeamDTO addTeamDTO) throws BadField {
        Team newTeam = new Team(getFreeId(), addTeamDTO.getName(), addTeamDTO.getLogoUrl(), addTeamDTO.getRegion(), addTeamDTO.getPlayers());
        TeamValidation.validate(newTeam);
        teamRepository.save(newTeam);
        eventPublisher.publishEvent(new TeamAddedEvent(this));
        return newTeam;
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

    public List<String> getRegionCategories() {
        List<Team> teams = teamRepository.findAll();
        List<String> regions = teams.stream()
                .map(Team::getRegion)
                .distinct()
                .collect(Collectors.toList());
        return regions;
    }

    public Map<String, Long> getRegionData() {
        List<Team> teams = teamRepository.findAll();
        Map<String, Long> regionsCount = teams.stream()
                .collect(Collectors.groupingBy(Team::getRegion, Collectors.counting()));

        return regionsCount;
    }

    public List<Team> getAllTeams() {
        return teamRepository.findAll();
    }

    public Team updateTeam(Integer id, Team updatedTeam) throws NotFound, BadField {
        Optional<Team> maybeTeam = teamRepository.findById(id);
        if (maybeTeam.isPresent()) {
            TeamValidation.validate(updatedTeam);
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
        Page<Team> result;
        if (Objects.equals(region, ""))
            result = teamRepository.findAll(pageRequest);
        else
            result = teamRepository.findAllByRegionContaining(region, pageRequest);
        return result;
    }

    public int getRandomExistingId(){
        return teamRepository.findRandomId();
    }

    private Integer getFreeId() {
        List<Team> allTeams = teamRepository.findAll();
        Integer maxId = allTeams.stream()
                .map(Team::getId)
                .max(Integer::compareTo)
                .orElse(0);
        return maxId + 1;
    }

}
