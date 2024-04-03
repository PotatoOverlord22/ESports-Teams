const express = require('express');


module.exports = function (service) {
    const router = express.Router();
    // Add team
    router.post('/teams', (req, res) => {
        if (!req.body) {
            // If request body is missing, send a 400 Bad Request response
            return res.status(400).json({ error: 'Request body is missing' });
        }
        try {
            service.addTeam(req.body);
            return res.status(200).json({ message: 'Team added successfully' });
        } catch (err) {
            return res.status(499).json({ error: 'Error adding team' });
        }
    });

    // Delete team 
    router.delete('/teams/:teamId', (req, res) => {
        const id = parseInt(req.params.teamId);
        if (isNaN(id)) {
            return res.status(404).json({ error: 'Team not found' });
        }
        try {
            service.deleteTeam(id)
        } catch (err) {
            return res.status(400).json({ error: "Couldn't delete team" })
        }
        return res.status(200).json({ message: "Team deleted sucessfully" });
    });

    // Update team
    router.put('/teams/:teamId', (req, res) => {
        const id = parseInt(req.params.teamId);
        if (isNaN(id)) {
            return res.status(404).json({ error: 'Team not found' });
        }
        try {
            service.editTeam(req.body, id)
        } catch (err) {
            return res.status(400).json({ error: "Couldn't edit team" })
        }
        return res.status(200).json({ message: "Team updated sucessfully" });
    })

    // Get teams
    router.get('/teams', (req, res) => {
        return res.json(service.getAllTeams());
    });

    return router
}