package com.emp.esports.controllers;

import com.emp.esports.models.entities.Player;
import com.emp.esports.models.entities.Team;
import com.emp.esports.models.exceptions.NotFound;
import com.emp.esports.services.PlayerService;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin("*")
public class PlayerController {
    private final PlayerService playerService;

    public PlayerController(PlayerService teamService) {
        this.playerService = teamService;
    }

    @GetMapping("/players")
    public ResponseEntity<?> getAllPlayers() {
        return ResponseEntity.ok(playerService.getAllPlayers());
    }

    @PostMapping("/players")
    public ResponseEntity<?> addPlayer(@RequestBody Player player,  @RequestParam Integer teamId) {
        if (player == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Request body is missing");
        }
        try {
            return ResponseEntity.ok().body(playerService.addNewPlayerToTeam(player, teamId));
        } catch (NotFound e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Team not found");
        }
    }

    @DeleteMapping("/players/{playerId}")
    public ResponseEntity<?> deletePlayer(@PathVariable Integer playerId) {
        try {
            playerService.deletePlayer(playerId);
            return ResponseEntity.ok().body("Player deleted successfully");
        } catch (NotFound e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Player not found");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Couldn't delete Player: " + e.getMessage());
        }
    }

    @PutMapping("/players/{playerId}")
    public ResponseEntity<?> updatePlayer(@PathVariable Integer playerId, @RequestBody Player updatedPLayer) {
        try {
            return ResponseEntity.ok().body(playerService.updatePlayer(playerId, updatedPLayer));
        } catch (NotFound e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Player not found");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Couldn't update Player: " + e.getMessage());
        }
    }
}