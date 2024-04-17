// TeamService.test.js

const TeamRepository = require('../repositories/TeamsRepository');
const TeamController = require('./TeamsController');

describe('TeamController', () => {
    const teamRepository = new TeamRepository()
    const teamsController = new TeamController(teamRepository);
    const teams = [
        { id: 1, name: "G2", logo: "https://licensinginternational.org/wp-content/uploads/2020/05/redeye.png", region: "EU", players: [{ id: 1, name: "caps", kda: 4.23, position: "Mid" }, { id: 2, name: "hans sama", kda: 3.45, position: "ADC" }, { id: 3, name: "mikyx", kda: 0.97, position: "Support" }, { id: 4, name: "Yike", kda: 2.03, position: "Jungle" }, { id: 5, name: "Broken Blade", kda: 2.97, position: "Top" }] },
        { id: 2, name: "Fnatic", logo: "https://am-a.akamaihd.net/image?resize=200:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2F1631819669150_fnc-2021-worlds.png", region: "EU", players: [{ id: 6, name: "Razork", kda: 2.45, position: "Jungle" }, { id: 7, name: "Oscarinin", kda: 3.08, position: "Top" }, { id: 8, name: "humanoid", kda: 2.04, position: "Mid" }, { id: 9, name: "noah", kda: 3.40, position: "ADC" }, { id: 10, name: "jun", kda: 0.89, position: "Support" }] },
        { id: 3, name: "Mad Lions KOI", logo: "https://s-qwer.op.gg/images/lol/teams/334_1672192037655.png", region: "EU", players: [{ id: 11, name: "elyoya", kda: 3.48, position: "Jungle" }, { id: 12, name: "supa", kda: 3.88, position: "ADC" }, { id: 13, name: "alvaro", kda: 0.45, position: "Support" }] },
        { id: 4, name: "kt Rolsters", logo: "https://am-a.akamaihd.net/image?resize=200:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2Fkt_darkbackground.png", region: "KR", players: [{ id: 14, name: "PerfecT", kda: 1.48, position: "Top" }, { id: 15, name: "bdd", kda: 4.88, position: "mid" }, { id: 16, name: "Deft", kda: 6.45, position: "ADC" }, { id: 17, name: "", kda: 1.45 }] },
        { id: 5, name: "Mad Lions KOI", logo: "https://s-qwer.op.gg/images/lol/teams/334_1672192037655.png", region: "KR", players: [{ id: 11, name: "elyoya", kda: 3.48, position: "Jungle" }, { id: 12, name: "supa", kda: 3.88, position: "ADC" }, { id: 13, name: "alvaro", kda: 0.45, position: "Support" }] },
        { id: 6, name: "Mad Lions KOI", logo: "https://s-qwer.op.gg/images/lol/teams/334_1672192037655.png", region: "TR", players: [{ id: 11, name: "elyoya", kda: 3.48, position: "Jungle" }, { id: 12, name: "supa", kda: 3.88, position: "ADC" }, { id: 13, name: "alvaro", kda: 0.45, position: "Support" }] },
        { id: 7, name: "FlyQuest", logo: "https://am-a.akamaihd.net/image?resize=200:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2Fflyquest-new-on-dark.png", region: "NA", players: [{ id: 14, name: "bussio", kda: 1.48, position: "Support" }, { id: 15, name: "Inspired", kda: 3.08, position: "Jungle" }, { id: 16, name: "Jensen", kda: 1.09, position: "Mid" }, { id: 17, name: "Bwipo", kda: 2.79, position: "Top" }, { id: 18, name: "Massu", kda: 2.34, position: "ADC" }] },
    ];

    beforeEach(() => {
        teamsController.setAllTeams(teams);
    });

    test('getAllTeams returns an array', () => {
        const teams = teamsController.getAllTeams();
        expect(Array.isArray(teams)).toBe(true);
    });

    test('editTeam edits an existing team correctly', () => {
        const teamsBeforeEdit = teamRepository.getAllData();
        const teamToEditId = teamsBeforeEdit[0].id;
        const updatedTeamData = { id: teamToEditId, name: "Updated Team", logo: "https://example.com/newlogo.png", region: "EU", players: [] };
        teamsController.editTeam(updatedTeamData, teamToEditId);
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
        teamsController.addTeam(newTeam);
        const teamsAfterAddition = teamRepository.getAllData();
        console.log("teams after addition: ", teamsAfterAddition)
        expect(teamsAfterAddition.length).toBe(lengthBefore + 1);
        expect(teamsAfterAddition.some(team => team.id === newTeam.id)).toBe(true);
    });

    test('deleteTeam deletes the specified team', () => {
        const teamsBeforeDeletion = teamRepository.getAllData();
        const lengthBefore = teamsBeforeDeletion.length;
        const teamToDeleteId = teamsBeforeDeletion[0].id;
        teamsController.deleteTeam(teamToDeleteId);
        const teamsAfterDeletion = teamRepository.getAllData();
        expect(teamsAfterDeletion.length).toBe(lengthBefore - 1);
        expect(teamsAfterDeletion.some(team => team.id === teamToDeleteId)).toBe(false);
    });

    test('getFilteredTeamsByPage returns paginated teams based on search query', () => {
        let regionSearch = "EU";
        const pageNumber = 1;
        const teamsPerPage = 2;
        let { paginatedFilteredTeams, totalPages } = teamsController.getFilteredTeamsByPage(pageNumber, teamsPerPage, regionSearch);
        // only EU teams included
        expect(paginatedFilteredTeams.every(team => team.region === regionSearch)).toBe(true);
        // correct pagination
        expect(paginatedFilteredTeams.length).toBe(teamsPerPage);
        // correct number of pages
        expect(totalPages).toBe(2); // test data has 3 eu teams, so 2 pages

        regionSearch = "TR";
        ({ paginatedFilteredTeams, totalPages } = teamsController.getFilteredTeamsByPage(pageNumber, teamsPerPage, regionSearch));
        expect(paginatedFilteredTeams.every(team => team.region === regionSearch)).toBe(true);
        // the page should be incomplete, containing only one team
        expect(paginatedFilteredTeams.length).toBe(1);
        // correct number of pages
        expect(totalPages).toBe(1); // test data has 3 eu teams, so 2 pages
    });

    test('getRegionCategories contains ', () => {
        const expectedRegions = ['EU', 'KR', 'TR', 'NA'];
        const regionCategories = teamsController.getRegionCategories();

        // same length
        expect(regionCategories.length).toBe(expectedRegions.length);
        // same items
        expect(regionCategories).toEqual(expect.arrayContaining(expectedRegions));
    })

    test('computeTotalNumberOfPages returns the number of pages of all the data given the size of a page', () => {
        // there are 7 teams in the test data
        let totalPages = teamsController.computeTotalNumberOfPages(5);
        expect(totalPages).toBe(2);

        totalPages = teamsController.computeTotalNumberOfPages(1);
        expect(totalPages).toBe(7);

        totalPages = teamsController.computeTotalNumberOfPages(2);
        expect(totalPages).toBe(4);
    })

    test('getRegionData returns correct region data', () => {
        const expectedRegionData = [
            { value: 3, label: 'EU' },
            { value: 1, label: 'NA' },
            { value: 2, label: 'KR' },
            { value: 1, label: 'TR' },
        ];
        const regionData = teamsController.getRegionData();
        // for all labels of expectedRegionData find the corresponding label of the computed data and expect label to be found and the values to be the same
        expectedRegionData.forEach(expectedData => {
            // find corresponding label in the computed data
            const matchedRegion = regionData.find(region => region.label === expectedData.label);

            // check if we matched the label
            expect(matchedRegion).toBeDefined();

            // check if the value is the same
            expect(matchedRegion.value).toEqual(expectedData.value);

        });
    });
});
