package com.emp.esports.utils.events;

import org.springframework.context.ApplicationEvent;

public class TeamAddedEvent extends ApplicationEvent {
    public TeamAddedEvent(Object source) {
        super(source);
    }
}
