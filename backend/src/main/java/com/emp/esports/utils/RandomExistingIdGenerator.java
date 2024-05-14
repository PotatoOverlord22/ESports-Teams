package com.emp.esports.utils;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;

import java.util.List;

public class RandomExistingIdGenerator {
    @PersistenceContext
    private EntityManager entityManager;

    public Integer getRandomPlayerId() {
        Query query = entityManager.createNativeQuery("SELECT id FROM players ORDER BY RAND() LIMIT 1");
        List<Integer> playerIdList = query.getResultList();
        if (!playerIdList.isEmpty()) {
            return playerIdList.get(0);
        }
        return null; // or throw an exception if necessary
    }

    public Integer getRandomTeamId() {
        Query query = entityManager.createNativeQuery("SELECT id FROM teams ORDER BY RAND() LIMIT 1");
        List<Integer> teamIdList = query.getResultList();
        if (!teamIdList.isEmpty()) {
            return teamIdList.get(0);
        }
        return null; // or throw an exception if necessary
    }
}
