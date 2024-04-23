package com.emp.esports.controllers;

import com.emp.esports.models.entities.Team;
import com.emp.esports.services.TeamService;
import org.apache.coyote.Response;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin("*")
public class TeamController {
    private final TeamService teamService;

    public TeamController(TeamService teamService){
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

}