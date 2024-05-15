package com.emp.esports.controllers;

import com.emp.esports.services.TeamService;
import com.emp.esports.utils.events.TeamAddedEvent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Controller;

@Controller
public class WebSocketController {
    private final SimpMessagingTemplate messagingTemplate;
    private final TeamService teamService;

    @Autowired
    public WebSocketController(SimpMessagingTemplate messagingTemplate, TeamService teamService) {
        this.messagingTemplate = messagingTemplate;
        this.teamService = teamService;
    }
    @EventListener
    public void sendPeriodicRegionData(TeamAddedEvent event) {
        messagingTemplate.convertAndSend("/topic/regionData", teamService.getRegionData());
        System.out.println("Sent region data");
    }
}
