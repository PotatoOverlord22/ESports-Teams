package com.emp.esports;

import com.emp.esports.repositories.TeamRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class EsportsApplication implements CommandLineRunner {
	private final TeamRepository teamRepository;

	public EsportsApplication(TeamRepository teamRepository){
		this.teamRepository = teamRepository;
	}
	public static void main(String[] args) {
		SpringApplication.run(EsportsApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		System.out.println(teamRepository);
		teamRepository.findAll().forEach(team -> {
			System.out.println(team.getName());
		});
	}
}
