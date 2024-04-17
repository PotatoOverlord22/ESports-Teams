const express = require('express');


module.exports = function (controller) {
    const router = express.Router();
    // Add team
    router.post('/teams', (req, res) => {
        if (!req.body) {
            // If request body is missing, send a 400 Bad Request response
            return res.status(400).json({ error: 'Request body is missing' });
        }
        try {
            controller.addTeam(req.body);
            return res.status(200).json({ message: 'Team added successfully' });
        } catch (error) {
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
            controller.deleteTeam(id)
        } catch (error) {
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
            controller.editTeam(req.body, id)
        } catch (error) {
            return res.status(400).json({ error: "Couldn't edit team" })
        }
        return res.status(200).json({ message: "Team updated sucessfully" });
    })

    // Get teams
    router.get('/teams', (req, res) => {
        let { page = 1, pageSize = 5, region = "" } = req.query;
        page = parseInt(page);
        pageSize = parseInt(pageSize);
        if (isNaN(page) || isNaN(pageSize))
            return res.status(405).json({ error: 'Incorrect query params' });
        try {
            const { paginatedFilteredTeams, totalPages } = controller.getFilteredTeamsByPage(page, pageSize, region);

            res.json({
                teams: paginatedFilteredTeams,
                totalPages: totalPages,
            });
            res.status(200);
        }
        catch (error) {
            res.status(499).json({ error: "Could not get teams " + error });
        }
    });
    // Get team categories
    router.get('/teams/region/categories', (req, res) => {
        try {
            const categories = controller.getRegionCategories();
            res.json(categories)
            res.status(200);
        } catch (error) {
            res.status(498).json({ error: error })
        }
    })

    // Region data api
    router.get('/teams/region/data', (req, res) => {
        try {
            res.json(controller.getRegionData())
            res.status(200);
        } catch (error) {
            res.status(498).json({ error: error })
        }
    });

    return router
}