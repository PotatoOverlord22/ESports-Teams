package com.emp.esports.repositories;

import com.emp.esports.models.entities.Player;
import com.emp.esports.models.entities.Team;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PlayerRepository extends JpaRepository<Player, Integer> {
    List<Player> findAllByTeamId(Integer id);
}
