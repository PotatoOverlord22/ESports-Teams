const teams = require("../routes/teams");

class TeamsService {
    constructor(teamRepository) {
        this.teamRepository = teamRepository;
    }

    getAllTeams() {
        return this.teamRepository.getAllData();
    }

    getFilteredTeamsByPage(pageNumber, teamsPerPage, region = "") {
        const teams = this.teamRepository.getAllData();
        let filteredTeams = teams;
        if (region !== "")
            filteredTeams = teams.filter(team => team.region === region)

        const indexOfLastTeam = pageNumber * teamsPerPage;
        const indexOfFirstTeam = indexOfLastTeam - teamsPerPage;

        const paginatedFilteredTeams = filteredTeams.slice(indexOfFirstTeam, indexOfLastTeam);
        const totalPages = Math.ceil(filteredTeams.length / teamsPerPage);

        return { paginatedFilteredTeams, totalPages }
    }

    computeTotalNumberOfPages(pageSize) {
        const teams = this.teamRepository.getAllData();
        return Math.ceil(teams.length / pageSize);
    }

    getRegionData() {
        const teams = this.teamRepository.getAllData();

        const regionsCount = {};
        teams.forEach(team => {
            // if this is undefined it adds 1, else increments it, hence the || 0
            regionsCount[team.region] = (regionsCount[team.region] || 0) + 1;
        });
        let id = 0;
        return Object.keys(regionsCount).map(region => ({
            id: id++,
            value: regionsCount[region],
            label: region,
        }));
    }

    getRegionCategories() {
        const teams = this.teamRepository.getAllData();
        const regions = teams.map(team => team.region);
        // set to remove duplicates
        return Array.from(new Set(regions));
    }

    setDataToHardCodedTeams() {
        this.teamRepository.setData([
            { id: 1, name: "G2", logo: "https://licensinginternational.org/wp-content/uploads/2020/05/redeye.png", region: "EU", players: [{ id: 1, name: "caps", kda: 4.23, position: "Mid" }, { id: 2, name: "hans sama", kda: 3.45, position: "ADC" }, { id: 3, name: "mikyx", kda: 0.97, position: "Support" }, { id: 4, name: "Yike", kda: 2.03, position: "Jungle" }, { id: 5, name: "Broken Blade", kda: 2.97, position: "Top" }] },
            { id: 2, name: "Fnatic", logo: "https://am-a.akamaihd.net/image?resize=200:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2F1631819669150_fnc-2021-worlds.png", region: "EU", players: [{ id: 6, name: "Razork", kda: 2.45, position: "Jungle" }, { id: 7, name: "Oscarinin", kda: 3.08, position: "Top" }, { id: 8, name: "humanoid", kda: 2.04, position: "Mid" }, { id: 9, name: "noah", kda: 3.40, position: "ADC" }, { id: 10, name: "jun", kda: 0.89, position: "Support" }] },
            { id: 3, name: "Mad Lions KOI", logo: "https://s-qwer.op.gg/images/lol/teams/334_1672192037655.png", region: "EU", players: [{ id: 11, name: "elyoya", kda: 3.48, position: "Jungle" }, { id: 12, name: "supa", kda: 3.88, position: "ADC" }, { id: 13, name: "alvaro", kda: 0.45, position: "Support" }] },
            { id: 4, name: "kt Rolsters", logo: "https://am-a.akamaihd.net/image?resize=200:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2Fkt_darkbackground.png", region: "KR", players: [{ id: 14, name: "PerfecT", kda: 1.48, position: "Top" }, { id: 15, name: "bdd", kda: 4.88, position: "mid" }, { id: 16, name: "Deft", kda: 6.45, position: "ADC" }, { id: 17, name: "", kda: 1.45 }] },
            { id: 5, name: "Mad Lions KOI", logo: "https://s-qwer.op.gg/images/lol/teams/334_1672192037655.png", region: "KR", players: [{ id: 11, name: "elyoya", kda: 3.48, position: "Jungle" }, { id: 12, name: "supa", kda: 3.88, position: "ADC" }, { id: 13, name: "alvaro", kda: 0.45, position: "Support" }] },
            { id: 6, name: "Mad Lions KOI", logo: "https://s-qwer.op.gg/images/lol/teams/334_1672192037655.png", region: "TR", players: [{ id: 11, name: "elyoya", kda: 3.48, position: "Jungle" }, { id: 12, name: "supa", kda: 3.88, position: "ADC" }, { id: 13, name: "alvaro", kda: 0.45, position: "Support" }] },
            { id: 7, name: "FlyQuest", logo: "https://am-a.akamaihd.net/image?resize=200:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2Fflyquest-new-on-dark.png", region: "NA", players: [{ id: 14, name: "bussio", kda: 1.48, position: "Support" }, { id: 15, name: "Inspired", kda: 3.08, position: "Jungle" }, { id: 16, name: "Jensen", kda: 1.09, position: "Mid" }, { id: 17, name: "Bwipo", kda: 2.79, position: "Top" }, { id: 18, name: "Massu", kda: 2.34, position: "ADC" }] },
        ]);
    }
    setAllTeams(newTeams) {
        this.teamRepository.setData(newTeams);
    }

    // TODO move CRUD to repository layer

    deleteTeam(id) {
        const teams = this.teamRepository.getAllData();

        const teamToDeleteIndex = teams.findIndex(team => team.id === id);
        if (teamToDeleteIndex === -1) {
            throw new Error("Team not found");
        }
        teams.splice(teamToDeleteIndex, 1);
        this.teamRepository.setData(teams);
    }
    addTeam(team) {
        const teams = this.teamRepository.getAllData();
        const newTeam = { ...team, id: Math.max(...teams.map(team => team.id)) + 1 };
        if (!newTeam || !newTeam.id || !newTeam.name || !newTeam.region || !newTeam.players)
            throw new Error("Invalid team data");
        teams.push(newTeam);
        this.teamRepository.setData(teams);
    }

    editTeam(editTeam, id) {
        const teams = this.teamRepository.getAllData();

        if (!editTeam || !editTeam.id || !editTeam.name || !editTeam.region || !editTeam.players) {
            throw new Error('Invalid team data')
        }
        const index = teams.findIndex(team => team.id === editTeam.id)
        if (index === -1) {
            throw new Error('Team not found');
        }
        teams[index] = { ...editTeam, id: id };
        this.teamRepository.setData(teams);
    }
}

module.exports = TeamsService;