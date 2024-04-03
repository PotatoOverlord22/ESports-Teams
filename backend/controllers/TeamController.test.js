// TeamService.test.js

const TeamRepository = require('../repositories/TeamRepository');
const TeamService = require('./TeamController');

describe('TeamService', () => {
    const teamRepository = new TeamRepository()
    const teamService = new TeamService(teamRepository);
    teamService.setDataToHardCodedTeams();
    beforeEach(() => {

    });

    test('getAllTeams returns an array', () => {
        const teams = teamService.getAllTeams();
        expect(Array.isArray(teams)).toBe(true);
    });

    test('editTeam edits an existing team correctly', () => {
        const teamsBeforeEdit = teamRepository.getAllData();
        const teamToEditId = teamsBeforeEdit[0].id;
        const updatedTeamData = { id: teamToEditId, name: "Updated Team", logo: "https://example.com/newlogo.png", region: "EU", players: [] };
        teamService.editTeam(updatedTeamData, teamToEditId);
        const teamsAfterEdit = teamRepository.getAllData();
        const editedTeam = teamsAfterEdit.find(team => team.id === teamToEditId);
        expect(editedTeam.name).toBe(updatedTeamData.name);
        expect(editedTeam.logo).toBe(updatedTeamData.logo);
    });

    test('addTeam adds a new team correctly', () => {
        const teamsBeforeAddition = teamRepository.getAllData();
        const lengthBefore = teamsBeforeAddition.length;
        console.log("before ", teamsBeforeAddition);
        const newTeam = { id: 8, name: "New Team", logo: "https://example.com/logo.png", region: "EU", players: [] };
        teamService.addTeam(newTeam);
        const teamsAfterAddition = teamRepository.getAllData();
        console.log("teams after addition: ", teamsAfterAddition)
        expect(teamsAfterAddition.length).toBe(lengthBefore + 1);
        expect(teamsAfterAddition.some(team => team.id === newTeam.id)).toBe(true);
    });

    test('deleteTeam deletes the specified team', () => {
        const teamsBeforeDeletion = teamRepository.getAllData();
        const lengthBefore = teamsBeforeDeletion.length;
        const teamToDeleteId = teamsBeforeDeletion[0].id;
        teamService.deleteTeam(teamToDeleteId);
        const teamsAfterDeletion = teamRepository.getAllData();
        expect(teamsAfterDeletion.length).toBe(lengthBefore - 1);
        expect(teamsAfterDeletion.some(team => team.id === teamToDeleteId)).toBe(false);
    });
});
