package com.emp.esports.controllers;

import com.emp.esports.dtos.AddTeamDTO;
import com.emp.esports.models.entities.Player;
import com.emp.esports.models.entities.Team;
import com.emp.esports.models.exceptions.NotFound;
import com.emp.esports.services.TeamService;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin("*")
@RequiredArgsConstructor
public class TeamController {
    private final TeamService teamService;

    @GetMapping("/teams")
    public ResponseEntity<?> getTeams(@RequestParam(defaultValue = "0") int page,
                                      @RequestParam(defaultValue = "5") int pageSize,
                                      @RequestParam(defaultValue = "") String region) {
        try {
            Page<Team> paginatedTeams = teamService.getFilteredTeamsByPage(page - 1, pageSize, region);
            return ResponseEntity.ok().body(paginatedTeams);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Could not get teams: " + e.getMessage());
        }
    }

    @GetMapping("/teams/{teamId}/players")
    public ResponseEntity<?> getPlayersByTeamId(@PathVariable Integer teamId) {
        try {
            List<Player> players = teamService.getAllPlayersByTeamId(teamId);
            return ResponseEntity.ok().body(players);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Could not get Players: " + e.getMessage());
        }
    }

    @DeleteMapping("/teams/{teamId}")
    @PreAuthorize("hasAnyRole('MANAGER', 'ADMIN')")
    public ResponseEntity<?> deleteTeam(@PathVariable Integer teamId) {
        try {
            teamService.deleteTeam(teamId);
            return ResponseEntity.ok().body("Team deleted successfully");
        } catch (NotFound e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Team not found");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Couldn't delete team: " + e.getMessage());
        }
    }

    @PutMapping("/teams/{teamId}")
    @PreAuthorize("hasAnyRole('MANAGER', 'ADMIN')")
    public ResponseEntity<?> updateTeam(@PathVariable Integer teamId, @RequestBody Team updatedTeam) {
        try {
            teamService.updateTeam(teamId, updatedTeam);
            return ResponseEntity.ok().body(teamService.getTeamById(teamId));
        } catch (NotFound e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Team not found");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Couldn't update team: " + e.getMessage());
        }
    }

    @PostMapping("/teams")
    @PreAuthorize("hasAnyRole('MANAGER', 'ADMIN')")
    public ResponseEntity<?> addTeam(@RequestBody AddTeamDTO addTeamDTO) {
        if (addTeamDTO == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Request body is missing");
        }
        try {
            teamService.addTeam(addTeamDTO);
            return ResponseEntity.status(HttpStatus.OK).body(addTeamDTO);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error adding team: " + e.getMessage());
        }
    }

    @GetMapping("/teams/region/categories")
    public ResponseEntity<?> getRegionCategories() {
        try {
            List<String> categories = teamService.getRegionCategories();
            return ResponseEntity.ok().body(categories);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error fetching region categories: " + e.getMessage());
        }
    }

    @GetMapping("/teams/region/data")
    public ResponseEntity<?> getRegionData() {
        try {
            Map<String, Long> regionData = teamService.getRegionData();
            return ResponseEntity.ok().body(regionData);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error fetching region data: " + e.getMessage());
        }
    }

}