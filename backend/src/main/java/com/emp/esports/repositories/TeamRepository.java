package com.emp.esports.repositories;


import com.emp.esports.models.entities.Team;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface TeamRepository extends JpaRepository<Team, Integer> {
    Page<Team> findAllByRegionContaining(String region, Pageable pageable);

    @Query(value = "SELECT id FROM teams ORDER BY random() LIMIT 1", nativeQuery = true)
    int findRandomId();
}
