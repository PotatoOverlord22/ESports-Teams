import { Fragment, useState, useEffect } from "react";
import axios from 'axios';
import "./TeamTable.css"
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import TeamRow from "../TeamRow/TeamRow";
import AddTeamForm from "../AddTeamForm/AddTeamForm";
import EditTeamForm from "../EditTeamForm/EditTeamForm";
import { API_TEAMS_URL } from "../../Constants"

export default function TeamTable({ teams, setTeams, fetchTeams }) {
    const [isAddingTeam, setIsAddingTeam] = useState(false);
    const [newTeam, setNewTeam] = useState({ name: '', region: '', players: [{ id: 1, name: '', position: '', kda: 0 }] });

    const [editTeam, setEditTeam] = useState(null);
    const [editTeamName, setEditTeamName] = useState(null);
    const [editTeamPlayers, setEditTeamPlayers] = useState([]);

    const fetchEditTeamPlayers = async (teamId) => {
        try {
            const playersResponse = await axios.get(API_TEAMS_URL + `/${teamId}/players`);
            setEditTeamPlayers(playersResponse.data);
            console.log('fetched players: ', playersResponse.data);
        } catch (error) {
            console.error('Error fetching players: ', error);
        }
    }

    const handleAddingTeam = () => {
        setIsAddingTeam(!isAddingTeam);
    }

    const handleDeleteTeam = (teamId) => {
        console.log('requesting delete to ', `${API_TEAMS_URL}/${teamId}`);
        // update optimistically
        setTeams(teams.filter(team => team.id !== teamId))

        axios.delete(`${API_TEAMS_URL}/${teamId}`)
            .then(() => {
                console.log("deleted team with id: ", teamId)
            })
            .catch((error) => {
                console.log("Error removing team: ", error);
                // get the correct teams
                fetchTeams();
            })
    }

    const handleEditTeam = (teamId) => {
        const selectedTeamToEdit = teams.find((team) => team.id === teamId)
        setEditTeamName(selectedTeamToEdit.name)
        setEditTeam(selectedTeamToEdit)
    }

    const handleSaveEdit = (event) => {
        event.preventDefault();

        console.log('requesting update to ', `${API_TEAMS_URL}/${editTeam.id}`)
        // Update optimistically
        const index = teams.findIndex(team => team.id === editTeam.id)
        const newEditedTeams = [...teams]
        newEditedTeams[index] = editTeam
        setTeams(newEditedTeams)
        setEditTeamName(null)
        setEditTeam(null)

        axios.put(`${API_TEAMS_URL}/${editTeam.id}`, editTeam)
            .then(() => {
                console.log("edited team: ", editTeam.id)
            })
            .catch((error) => {
                console.log("Error editing team: ", error);
                // fetch true teams
                fetchTeams();
            })
    }

    const handleEditFieldChange = (e) => {
        const { name, value } = e.target;
        setEditTeam((prevEditTeam) => ({
            ...prevEditTeam, [name]: value
        }))
    }

    const handleEditPlayerChange = (e, playerId) => {
        const { name, value } = e.target;
        const playerToUpdateIndex = editTeam.players.findIndex(player => player.id === playerId)
        const updatedPlayers = [...editTeam.players];

        updatedPlayers[playerToUpdateIndex] = {
            ...updatedPlayers[playerToUpdateIndex],
            [name]: value
        };

        setEditTeam(prevEditTeam => ({
            ...prevEditTeam,
            players: updatedPlayers
        }));
    }

    const handleAddChange = (e) => {
        const { name, value } = e.target;
        setNewTeam((prevTeam) => ({
            ...prevTeam,
            [name]: value,
        }));
    };

    const handlePlayerAddChange = (e) => {
        // TODO: proper logic for multiple player additions
        // note: [name] <=> field we are changing
        const { name, value } = e.target;
        setNewTeam(prevTeam => ({
            ...prevTeam,
            players: [{
                ...prevTeam.players[0],
                [name]: value
            }]
        }));
    }


    const handleAddTeam = (event) => {
        event.preventDefault();
        const newTeamWithId = { ...newTeam, id: Math.max(...teams.map(team => team.id)) + 1 }

        setIsAddingTeam(false);
        setNewTeam({ name: '', region: '', players: [{ id: 1, name: '', position: '', kda: '' }] });

        axios.post(`${API_TEAMS_URL}`, newTeamWithId)
            .then(() => {
                fetchTeams();
                console.log("posted team: ", newTeamWithId);
            })
            // TODO proper error handling for each error case
            .catch(error => {
                console.log("Error adding team: ", error);
                // Get the correct teams
                fetchTeams();
            });
    }


    return (
        <>
            <Paper elevation={14}>
                <Typography variant="h3" gutterBottom>Esports teams</Typography>
            </Paper>

            <TableContainer component={Paper} elevation={14}>
                <Table className="team-table-style">
                    <TableHead>
                        <TableRow>
                            <TableCell><Typography variant="h4" sx={{ textAlign: "center", fontWeight: "bold" }}>Logo</Typography></TableCell>
                            <TableCell><Typography variant="h4" sx={{ textAlign: "center", fontWeight: "bold" }}>Team Name</Typography></TableCell>
                            <TableCell><Typography variant="h4" sx={{ textAlign: "center", fontWeight: "bold" }}>Region</Typography></TableCell>
                            <TableCell><Typography variant="h4" sx={{ textAlign: "center", fontWeight: "bold" }}>Actions</Typography></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {teams.map((team) => (
                            <TeamRow key={team.id} team={team} onEdit={handleEditTeam} onDelete={handleDeleteTeam} />
                        ))}
                        {
                            isAddingTeam ? (
                                <AddTeamForm
                                    newTeam={newTeam}
                                    onSubmit={handleAddTeam}
                                    onFormChange={handleAddChange}
                                    onCancel={() => setIsAddingTeam(false)}
                                    onPlayerFormChange={handlePlayerAddChange} />
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={10} align="center">
                                        <Button variant="contained" onClick={() => handleAddingTeam()}>Add new team</Button>
                                    </TableCell>
                                </TableRow>
                            )
                        }
                        {
                            editTeam && <EditTeamForm
                                editTeam={editTeam}
                                editTeamNameCopy={editTeamName}
                                onSubmit={handleSaveEdit}
                                onFormChange={handleEditFieldChange}
                                onCancel={() => { setEditTeam(null) }}
                            />
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}