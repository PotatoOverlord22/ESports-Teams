const express = require('express');
const router = express.Router();

const teams = [
    { id: 1, name: "G2", logo: "https://licensinginternational.org/wp-content/uploads/2020/05/redeye.png", region: "EU", players: [{ id: 1, name: "caps", kda: 4.23, position: "Mid" }, { id: 2, name: "hans sama", kda: 3.45, position: "ADC" }, { id: 3, name: "mikyx", kda: 0.97, position: "Support" }, { id: 4, name: "Yike", kda: 2.03, position: "Jungle" }, { id: 5, name: "Broken Blade", kda: 2.97, position: "Top" }] },
    { id: 2, name: "Fnatic", logo: "https://am-a.akamaihd.net/image?resize=200:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2F1631819669150_fnc-2021-worlds.png", region: "EU", players: [{ id: 6, name: "Razork", kda: 2.45, position: "Jungle" }, { id: 7, name: "Oscarinin", kda: 3.08, position: "Top" }, { id: 8, name: "humanoid", kda: 2.04, position: "Mid" }, { id: 9, name: "noah", kda: 3.40, position: "ADC" }, { id: 10, name: "jun", kda: 0.89, position: "Support" }] },
    { id: 3, name: "Mad Lions KOI", logo: "https://s-qwer.op.gg/images/lol/teams/334_1672192037655.png", region: "EU", players: [{ id: 11, name: "elyoya", kda: 3.48, position: "Jungle" }, { id: 12, name: "supa", kda: 3.88, position: "ADC" }, { id: 13, name: "alvaro", kda: 0.45, position: "Support" }] },
    { id: 4, name: "kt Rolsters", logo: "https://am-a.akamaihd.net/image?resize=200:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2Fkt_darkbackground.png", region: "KR", players: [{ id: 14, name: "PerfecT", kda: 1.48, position: "Top" }, { id: 15, name: "bdd", kda: 4.88, position: "mid" }, { id: 16, name: "Deft", kda: 6.45, position: "ADC" }, { id: 17, name: "", kda: 1.45 }] },
    { id: 5, name: "Mad Lions KOI", logo: "https://s-qwer.op.gg/images/lol/teams/334_1672192037655.png", region: "KR", players: [{ id: 11, name: "elyoya", kda: 3.48, position: "Jungle" }, { id: 12, name: "supa", kda: 3.88, position: "ADC" }, { id: 13, name: "alvaro", kda: 0.45, position: "Support" }] },
    { id: 6, name: "Mad Lions KOI", logo: "https://s-qwer.op.gg/images/lol/teams/334_1672192037655.png", region: "TR", players: [{ id: 11, name: "elyoya", kda: 3.48, position: "Jungle" }, { id: 12, name: "supa", kda: 3.88, position: "ADC" }, { id: 13, name: "alvaro", kda: 0.45, position: "Support" }] },
    { id: 7, name: "FlyQuest", logo: "https://am-a.akamaihd.net/image?resize=200:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2Fflyquest-new-on-dark.png", region: "NA", players: [{ id: 14, name: "bussio", kda: 1.48, position: "Support" }, { id: 15, name: "Inspired", kda: 3.08, position: "Jungle" }, { id: 16, name: "Jensen", kda: 1.09, position: "Mid" }, { id: 17, name: "Bwipo", kda: 2.79, position: "Top" }, { id: 18, name: "Massu", kda: 2.34, position: "ADC" }] },
];

// Add team
router.post('/teams', (req, res) => {
    if (!req.body) {
        // If request body is missing, send a 400 Bad Request response
        return res.status(400).json({ error: 'Request body is missing' });
    }
    const newTeam = req.body;
    if (!newTeam || !newTeam.id || !newTeam.name || !newTeam.region)
        return res.status(400).json({ error: 'Invalid team data' })

    const existingTeam = teams.find(team => team.id === newTeam.id);
    if (existingTeam) {
        return res.status(404).json({ error: 'Team not found' });
    }

    teams.push(newTeam);
    return res.status(200).json({ message: 'Team added successfully' });
});

// Delete team 
router.delete('/teams/:teamId', (req, res) => {
    console.log("teamid:", req.params.teamId);
    const id = parseInt(req.params.teamId);
    if (isNaN(id)) {
        return res.status(404).json({ error: 'Team not found' });
    }
    console.log("parsed teamid:", id);
    const teamToDeleteIndex = teams.findIndex(team => team.id === id);
    if (teamToDeleteIndex === -1) {
        return res.status(404).json({ error: 'Team not found' });
    }
    teams.splice(teamToDeleteIndex, 1);
    return res.status(200).json({ message: 'Team deleted successfully' });
});

// Update team
router.post('/teams/:teamId', (req, res) => {
    const id = parseInt(req.params.teamId);
    if (isNaN(id)) {
        return res.status(404).json({ error: 'Team not found' });
    }
    const editTeam = req.body;
    console.log("editTeam: ", editTeam);
    if (!editTeam || !editTeam.id || !editTeam.name || !editTeam.region) {
        return res.status(400).json({ error: 'Invalid team data' })
    }
    const index = teams.findIndex(team => team.id === editTeam.id)
    if (index === -1) {
        return res.status(404).json({ error: 'Team not found' });
    }
    teams[index] = editTeam;
    return res.status(200).json({ message: 'Team edited successfully' });
})

// Get teams
router.get('/teams', (req, res) => {
    return res.json(teams);
});

module.exports = router;