import { Fragment, useState } from "react";
import "./TeamTable.css"
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Grid, TextField } from "@mui/material";
import TeamRow from "../TeamRow/TeamRow";
import AddTeamForm from "../AddTeamForm/AddTeamForm";
import EditTeamForm from "../EditTeamForm/EditTeamForm";

export default function TeamTable({ teamsList }) {
    const [teams, setTeams] = useState(teamsList);
    const [isAddingTeam, setIsAddingTeam] = useState(false);
    const [editTeam, setEditTeam] = useState(null);
    const [editTeamName, setEditTeamName] = useState(null);
    const [newTeam, setNewTeam] = useState({ name: '', region: '', players: [] });

    const handleAddingTeam = () => {
        setIsAddingTeam(!isAddingTeam);
    }

    const handleDeleteTeam = (teamId) => {
        const newTeams = teams.filter(team => team.id !== teamId)
        setTeams(newTeams)
    }

    const handleEditTeam = (teamId) => {
        const selectedTeamToEdit = teams.find((team) => team.id === teamId)
        console.log("selected team: " + selectedTeamToEdit)
        setEditTeamName(selectedTeamToEdit.name)
        setEditTeam(selectedTeamToEdit)
    }

    const handleSaveEdit = (event) => {
        event.preventDefault();
        const index = teams.findIndex(team => team.id === editTeam.id)
        const newEditedTeams = [...teams]
        newEditedTeams[index] = editTeam
        console.log(editTeam)
        setTeams(newEditedTeams)
        setEditTeamName(null)
        setEditTeam(null)
    }

    const handleEditFieldChange = (e) => {
        const { name, value } = e.target;
        console.log(name + ": " + value)
        setEditTeam((prevEditTeam) => ({
            ...prevEditTeam, [name]: value
        }))
    }

    const handleEditPlayerChange = (e) => {
        const { name, value } = e.target;
        const playerToUpdateIndex = editTeam.players.findIndex(player => player.name === name)
        const updatedPlayers = [...editTeam.players];

        updatedPlayers[playerToUpdateIndex] = {
            ...updatedPlayers[playerToUpdateIndex],
            name: value
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

    const handleAddTeam = (event) => {
        event.preventDefault();
        const newTeamWithId = { ...newTeam, id: Math.max(...teams.map(team => team.id)) + 1 }
        setTeams([...teams, newTeamWithId])
        setIsAddingTeam(false)
        setNewTeam({ name: '', region: '', players: [] })
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
                                <AddTeamForm newTeam={newTeam} onSubmit={handleAddTeam} onFormChange={handleAddChange} onCancel={() => setIsAddingTeam(false)} />
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
                                onPlayerFormChange={handleEditPlayerChange} 
                                onCancel={() => { setEditTeam(null) }} />
                        }

                    </TableBody>
                </Table>
            </TableContainer>

        </>
    );
}