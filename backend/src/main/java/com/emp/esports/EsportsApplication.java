package com.emp.esports;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class EsportsApplication implements CommandLineRunner {
    public EsportsApplication() {

    }

    public static void main(String[] args) {
        SpringApplication.run(EsportsApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {

    }
}
