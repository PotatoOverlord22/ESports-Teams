import { Fragment, useState } from "react";
import "./TeamTable.css"
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Grid, TextField } from "@mui/material";

export default function TeamTable({ teamsList }) {
    const [teams, setTeams] = useState(teamsList);
    const [expandedTeamId, setExpandedTeamId] = useState(null);
    const [isAddingTeam, setIsAddingTeam] = useState(false);
    const [editTeam, setEditTeam] = useState(null);
    const [editTeamName, setEditTeamName] = useState(null);

    const handleMoreInfo = (teamId) => {
        setExpandedTeamId(teamId === expandedTeamId ? null : teamId);
    };

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
                            <TableCell><Typography variant="h4" sx={{ textAlign: "center", fontWeight: "bold" }}>More info</Typography></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {teams.map((team) => (
                            <Fragment key={team.id}>
                                <TableRow>
                                    <TableCell align="center"><img src={team.logo} alt={team.name + " logo"} className="team-logo" /></TableCell>
                                    <TableCell align="center"><Typography variant="h5" sx={{ textAlign: "center" }}>{team.name}</Typography></TableCell>
                                    <TableCell align="center"><Typography variant="h5" sx={{ textAlign: "center" }}>{team.region}</Typography></TableCell>
                                    <TableCell align="center">
                                        <div className="extra-info">
                                            <img src="https://cdn-icons-png.freepik.com/256/329/329222.png" id="info-icon" onClick={
                                                (e) => { handleMoreInfo(team.id) }} />
                                            <Button variant="outlined" onClick={() => handleEditTeam(team.id)}>Edit</Button>
                                            <Button variant="outlined" onClick={() => handleDeleteTeam(team.id)}>Delete</Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                                {
                                    expandedTeamId === team.id && (
                                        <>
                                            <TableRow>
                                                <TableCell colSpan="2" align="center">
                                                    <Typography variant="h6" sx={{ textAlign: "center", fontWeight: "bold" }}>Player Name</Typography>
                                                </TableCell>
                                                <TableCell colSpan="1" align="center">
                                                    <Typography variant="h6" sx={{ textAlign: "center", fontWeight: "bold" }}>Role</Typography>
                                                </TableCell>
                                                <TableCell colSpan="1" align="center">
                                                    <Typography variant="h6" sx={{ textAlign: "center", fontWeight: "bold" }}>KDA</Typography>
                                                </TableCell>
                                            </TableRow>
                                            {team.players.map((player) => (
                                                <TableRow key={player.name}>
                                                    <TableCell colSpan="2" align="center">
                                                        <Typography variant="h6" sx={{ textAlign: "center" }}>{player.name}</Typography>
                                                    </TableCell>
                                                    <TableCell colSpan="1" align="center">
                                                        <Typography variant="h6" sx={{ textAlign: "center" }}>{player.position}</Typography>
                                                    </TableCell>
                                                    <TableCell colSpan="1" align="center">
                                                        <Typography variant="h6" sx={{ textAlign: "center" }}>{player.kda}</Typography>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </>
                                    )
                                }
                            </Fragment>
                        ))}
                        {
                            isAddingTeam ? (
                                <>
                                    <TableRow>
                                        <h1>dasdfa  </h1>
                                        <form>

                                        </form>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell colSpan={10} align="center">
                                            <Button variant="contained" onClick={() => handleAddingTeam()}>Save new team</Button>
                                        </TableCell>
                                    </TableRow>
                                </>
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={10} align="center">
                                        <Button variant="contained" onClick={() => handleAddingTeam()}>Add new team</Button>
                                    </TableCell>
                                </TableRow>
                            )
                        }
                        {
                            editTeam && (

                                <TableRow>
                                    <TableCell colSpan={4} align="center">
                                        <Typography variant="h5" sx={{ textAlign: "center", fontWeight: 'bold' }}>Edit {editTeamName}</Typography>
                                        <form onSubmit={handleSaveEdit}>
                                            <TextField

                                                type="text"
                                                label="Name"
                                                name="name"
                                                value={editTeam.name}
                                                onChange={handleEditFieldChange}
                                                variant="filled"
                                                gutterbottom="true"
                                                required
                                            />
                                            <br></br>
                                            <TextField

                                                type="text"
                                                label="Region"
                                                name="region"
                                                value={editTeam.region}
                                                onChange={handleEditFieldChange}
                                                variant="filled"
                                                gutterbottom="true"
                                                required
                                            />
                                            <br></br>
                                            {
                                                editTeam.players.map(player => (
                                                    <>
                                                        <TextField
                                                            type="text"
                                                            label={player.position}
                                                            name={player.name}
                                                            value={player.name}
                                                            onChange={handleEditPlayerChange}
                                                            variant="filled"
                                                            gutterbottom="true"
                                                        />
                                                        <br></br>
                                                    </>
                                                ))
                                            }
                                            <Button type="submit" variant="contained" gutterbottom="true">
                                                Save Edit
                                            </Button>
                                            <br></br>
                                            <br></br>
                                            <Button variant="contained" onClick={() => { setEditTeam(null) }}>
                                                Cancel
                                            </Button>

                                        </form>
                                    </TableCell>
                                </TableRow>

                            )
                        }

                    </TableBody>
                </Table>
            </TableContainer>

        </>
    );
}