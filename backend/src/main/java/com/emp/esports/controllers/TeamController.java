package com.emp.esports.controllers;

import com.emp.esports.models.entities.Team;
import com.emp.esports.models.exceptions.NotFound;
import com.emp.esports.services.TeamService;
import org.apache.coyote.Response;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin("*")
public class TeamController {
    private final TeamService teamService;

    public TeamController(TeamService teamService) {
        this.teamService = teamService;
    }

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

    @DeleteMapping("/teams/{teamId}")
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
    public ResponseEntity<?> updateTeam(@PathVariable Integer teamId, @RequestBody Team updatedTeam) {
        try {
            teamService.updateTeam(teamId, updatedTeam);
            return ResponseEntity.ok().body("Team updated successfully");
        } catch (NotFound e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Team not found");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Couldn't update team: " + e.getMessage());
        }
    }

    @PostMapping("/teams")
    public ResponseEntity<?> addTeam(@RequestBody Team team) {
        if (team == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Request body is missing");
        }
        try {
            teamService.addTeam(team);
            return ResponseEntity.status(HttpStatus.OK).body("Team added successfully");
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