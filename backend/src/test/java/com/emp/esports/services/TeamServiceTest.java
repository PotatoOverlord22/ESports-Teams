//package com.emp.esports.services;
//
//import com.emp.esports.models.entities.Player;
//import com.emp.esports.models.entities.Team;
//import com.emp.esports.models.exceptions.BadField;
//import com.emp.esports.models.exceptions.NotFound;
//import com.emp.esports.repositories.TeamRepository;
//import com.emp.esports.services.TeamService;
//import com.emp.esports.utils.Converter;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.mockito.InjectMocks;
//import org.mockito.Mock;
//import org.mockito.MockitoAnnotations;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.data.domain.Page;
//import org.springframework.data.domain.PageImpl;
//import org.springframework.data.domain.PageRequest;
//import org.springframework.data.domain.Pageable;
//
//import java.util.*;
//
//import static org.assertj.core.api.Assertions.*;
//import static org.assertj.core.api.AssertionsForClassTypes.assertThatThrownBy;
//import static org.mockito.Mockito.*;
//
//public class TeamServiceTest {
//
//    @Mock
//    private TeamRepository teamRepository;
//
//    @InjectMocks
//    private TeamService teamService;
//
//    @BeforeEach
//    void setUp() {
//        MockitoAnnotations.openMocks(this);
//        Team team1 = Team.builder()
//                .id(1)
//                .name("team 1")
//                .region("EU")
//                .logoUrl("team 1 logo")
//                .players(new ArrayList<>())
//                .build();
//        Team team2 = Team.builder()
//                .id(2)
//                .name("team 2")
//                .region("NA")
//                .logoUrl("team 2 logo")
//                .players(new ArrayList<>())
//                .build();
//        Team team3 = Team.builder()
//                .id(3)
//                .name("team 3")
//                .region("EU")
//                .logoUrl("team 3 logo")
//                .players(new ArrayList<>())
//                .build();
//        List<Team> teams = Arrays.asList(team1, team2, team3);
//        when(teamRepository.findAll()).thenReturn(teams);
//    }
//
//    @Test
//    void testAddTeam() throws Exception {
//        Team team4 = Team.builder()
//                .id(1)
//                .name("team 4")
//                .region("KR")
//                .logoUrl("team 4 logo")
//                .players(new ArrayList<>())
//                .build();
//        when(teamRepository.saveAndFlush(team4)).thenReturn(team4);
//
//        Team addedTeam = teamService.addTeam(Converter.convertTeamToAddTeamDTO(team4));
//
//        assertThat(addedTeam).isEqualTo(team4);
//        verify(teamRepository).saveAndFlush(team4);
//    }
//
//    @Test
//    void testUpdateTeam() {
//        int teamId = 1;
//        Team existingTeam = Team.builder()
//                .id(teamId)
//                .name("team 1")
//                .logoUrl("team 1 logo")
//                .region("EU")
//                .players(new ArrayList<>())
//                .build();
//        Team updatedTeam = Team.builder()
//                .id(teamId)
//                .name("updated team name")
//                .logoUrl("updated logo")
//                .region("updated region")
//                .players(new ArrayList<>())
//                .build();
//
//        // mock behavior
//        when(teamRepository.findById(teamId)).thenReturn(Optional.of(existingTeam));
//        when(teamRepository.save(existingTeam)).thenReturn(existingTeam);
//
//        assertThatNoException().isThrownBy(() -> teamService.updateTeam(teamId, updatedTeam));
//
//        verify(teamRepository).findById(teamId);
//        verify(teamRepository).save(existingTeam);
//        assertThat(existingTeam.getName()).isEqualTo("updated team name");
//        assertThat(existingTeam.getLogoUrl()).isEqualTo("updated logo");
//        assertThat(existingTeam.getRegion()).isEqualTo("updated region");
//
//        // test for nonexistent team id
//        int badTeamId = -1;
//        when(teamRepository.findById(teamId)).thenReturn(Optional.empty());
//        assertThatThrownBy(() -> teamService.updateTeam(badTeamId, updatedTeam))
//                .isInstanceOf(NotFound.class)
//                .hasMessage("Could not find team with id " + badTeamId);
//
//        verify(teamRepository).findById(badTeamId);
//        // no more saves should happen
//        verifyNoMoreInteractions(teamRepository);
//    }
//
//    @Test
//    void testDeleteTeam() {
//        int teamIdToDelete = 1;
//        int invalidTeamId = -1;
//        when(teamRepository.existsById(teamIdToDelete)).thenReturn(true);
//        when(teamRepository.existsById(invalidTeamId)).thenReturn(false);
//
//        assertThatNoException().isThrownBy(() -> teamService.deleteTeam(teamIdToDelete));
//        assertThatThrownBy(() -> teamService.deleteTeam(invalidTeamId))
//                .isInstanceOf(NotFound.class);
//
//        verify(teamRepository).deleteById(teamIdToDelete);
//    }
//
//    @Test
//    void testGetTeamById() throws NotFound {
//        int teamId = 1;
//        Team team = Team.builder()
//                .id(teamId)
//                .name("team 1")
//                .region("EU")
//                .logoUrl("team 1 logo")
//                .build();
//        when(teamRepository.findById(teamId)).thenReturn(Optional.of(team));
//
//        Team fetchedTeam = teamService.getTeamById(teamId);
//
//        assertThat(fetchedTeam).isEqualTo(team);
//    }
//
//    @Test
//    void testGetTeamById_NotFound() {
//        int nonExistingTeamId = -1;
//        when(teamRepository.findById(nonExistingTeamId)).thenReturn(Optional.empty());
//
//        assertThatThrownBy(() -> teamService.getTeamById(nonExistingTeamId))
//                .isInstanceOf(NotFound.class);
//    }
//
//    @Test
//    void testGetRegionCategories() {
//        List<Team> teams = Arrays.asList(
//                Team.builder().region("EU").build(),
//                Team.builder().region("NA").build(),
//                Team.builder().region("KR").build()
//        );
//        when(teamRepository.findAll()).thenReturn(teams);
//
//        List<String> regionCategories = teamService.getRegionCategories();
//
//        assertThat(regionCategories).containsExactlyInAnyOrder("EU", "NA", "KR");
//    }
//
//    @Test
//    void testGetRegionData() {
//        List<Team> teams = Arrays.asList(
//                Team.builder().region("EU").build(),
//                Team.builder().region("EU").build(),
//                Team.builder().region("NA").build(),
//                Team.builder().region("KR").build()
//        );
//        when(teamRepository.findAll()).thenReturn(teams);
//
//        Map<String, Long> regionData = teamService.getRegionData();
//
//        assertThat(regionData).containsOnlyKeys("EU", "NA", "KR");
//        assertThat(regionData.get("EU")).isEqualTo(2);
//        assertThat(regionData.get("NA")).isEqualTo(1);
//        assertThat(regionData.get("KR")).isEqualTo(1);
//    }
//
//    @Test
//    void testGetFilteredTeamsByPage_WithRegion() {
//        int pageNumber = 0;
//        int pageSize = 2;
//        String region = "EU";
//        Pageable pageRequest = PageRequest.of(pageNumber, pageSize);
//        List<Team> teams = Arrays.asList(
//                Team.builder().id(1).name("team 1").region("EU").build(),
//                Team.builder().id(2).name("team 2").region("NA").build(),
//                Team.builder().id(3).name("team 3").region("EU").build()
//        );
//        Page<Team> expectedPage = new PageImpl<>(teams, pageRequest, teams.size());
//        when(teamRepository.findAllByRegionContaining(region, pageRequest)).thenReturn(expectedPage);
//
//        Page<Team> result = teamService.getFilteredTeamsByPage(pageNumber, pageSize, region);
//
//        assertThat(result).isEqualTo(expectedPage);
//        assertThat(result.getTotalPages()).isEqualTo(expectedPage.getTotalPages());
//    }
//
//    @Test
//    void testGetFilteredTeamsByPage_WithoutRegion() {
//        int pageNumber = 0;
//        int pageSize = 2;
//        String region = "";
//        Pageable pageRequest = PageRequest.of(pageNumber, pageSize);
//        List<Team> teams = Arrays.asList(
//                Team.builder().id(1).name("team 1").region("EU").build(),
//                Team.builder().id(2).name("team 2").region("NA").build(),
//                Team.builder().id(3).name("team 3").region("EU").build()
//        );
//        Page<Team> expectedPage = new PageImpl<>(teams, pageRequest, teams.size());
//        when(teamRepository.findAll(pageRequest)).thenReturn(expectedPage);
//
//        Page<Team> result = teamService.getFilteredTeamsByPage(pageNumber, pageSize, region);
//
//        assertThat(result).isEqualTo(expectedPage);
//        assertThat(result.getTotalPages()).isEqualTo(expectedPage.getTotalPages());
//    }
//}
