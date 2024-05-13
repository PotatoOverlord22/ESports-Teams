import { useState } from "react";
import axios from 'axios';
import { TableRow, TableCell, Button, Typography, TableHead, Table, TableBody } from "@mui/material";
import "./TeamRow.css"
import { API_PLAYERS_URL, API_TEAMS_URL } from "../../Constants";
import AddPlayerForm from "../AddPlayerForm/AddPlayerForm";

export default function TeamRow({ team, onEdit, onDelete }) {
    const [players, setPlayers] = useState(team.players);
    const [moreInfo, setMoreInfo] = useState(false);
    const [newPlayer, setNewPlayer] = useState({ id: 0, name: '', position: '', kda: ''});

    const [isAddingPlayer, setIsAddingPlayer] = useState(false);

    const fetchPlayers = async (teamId) => {
        try {
            const playersResponse = await axios.get(API_TEAMS_URL + `/${teamId}/players`);
            setPlayers(playersResponse.data);
            console.log('fetched players: ', playersResponse.data);
        } catch (error) {
            console.error('Error fetching players: ', error);
        }
    }

    const handleDeletePlayer = (playerId) => {
        console.log('requesting delete to ', `${API_PLAYERS_URL}/${playerId}`);
        // update optimistically
        setPlayers(players.filter(player => player.id != playerId))

        axios.delete(`${API_PLAYERS_URL}/${playerId}`)
            .then(() => {
                console.log("deleted player with id: ", playerId)
            })
            .catch((error) => {
                console.log("Error removing player: ", error);
                // get the correct teams
                fetchPlayers(team.id);
            })
    }

    const handleAddingPlayer = () => {
        setIsAddingPlayer(!isAddingPlayer);
    }

    const handleMoreInfo = () => {
        setMoreInfo(!moreInfo);
    };

    const handleAddPlayerChange = (e) => {
        const { name, value } = e.target;
        setNewPlayer((prevPlayer) => ({
            ...prevPlayer,
            [name]: value,
        }));
    };

    const handleAddPlayer = (event) => {
        event.preventDefault();

        setIsAddingPlayer(false);
        setNewPlayer({ id: 0, name: '', position: '', kda: ''});

        axios.post(`${API_PLAYERS_URL}/?teamId=${team.id}`, newPlayer)
            .then(() => {
                fetchPlayers(team.id);
                console.log("posted player: ", newPlayer);
            })
            // TODO proper error handling for each error case
            .catch(error => {
                console.log("Error adding team: ", error);
                // Get the correct teams
                fetchPlayers(team.id);
            });
    }

    return (
        <>
            <TableRow>
                <TableCell align="center"><img src={team.logoUrl} alt={team.name + " logo"} className="team-logo" /></TableCell>
                <TableCell align="center"><Typography variant="h5" sx={{ textAlign: "center" }}>{team.name}</Typography></TableCell>
                <TableCell align="center"><Typography variant="h5" sx={{ textAlign: "center" }}>{team.region}</Typography></TableCell>
                <TableCell align="center">
                    <div className="extra-info">
                        <img src="https://cdn-icons-png.freepik.com/256/329/329222.png"
                            id="info-icon"
                            onClick={() => { handleMoreInfo() }}
                            alt="more-info-icon.jpg"
                        />
                        <Button variant="outlined"
                            onClick={() => onEdit(team.id)}
                            role="edit-button">Edit</Button>
                        <Button variant="outlined" onClick={() => onDelete(team.id)}>Delete</Button>
                    </div>
                </TableCell>
            </TableRow>
            {
                moreInfo && (
                    <>
                        <TableRow>
                            <TableCell colSpan="1" align="center">
                                <Typography variant="h6" sx={{ textAlign: "center", fontWeight: "bold" }}>Player Name</Typography>
                            </TableCell>
                            <TableCell colSpan="1" align="center">
                                <Typography variant="h6" sx={{ textAlign: "center", fontWeight: "bold" }}>Role</Typography>
                            </TableCell>
                            <TableCell colSpan="1" align="center">
                                <Typography variant="h6" sx={{ textAlign: "center", fontWeight: "bold" }}>KDA</Typography>
                            </TableCell>
                            <TableCell colSpan="1" align="center">
                                <Typography variant="h6" sx={{ textAlign: "center", fontWeight: "bold" }}>Actions</Typography>
                            </TableCell>
                        </TableRow>
                        {players.map((player) => (
                            <TableRow key={player.id}>
                                <TableCell colSpan="1" align="center">
                                    <Typography variant="h6" sx={{ textAlign: "center" }}>{player.name}</Typography>
                                </TableCell>
                                <TableCell colSpan="1" align="center">
                                    <Typography variant="h6" sx={{ textAlign: "center" }}>{player.position}</Typography>
                                </TableCell>
                                <TableCell colSpan="1" align="center">
                                    <Typography variant="h6" sx={{ textAlign: "center" }}>{player.kda}</Typography>
                                </TableCell>
                                <TableCell colSpan="1" align="center">
                                    <Button variant="outlined"
                                        role="edit-button">Edit Player</Button>
                                    <Button variant="outlined"
                                        onClick={() => handleDeletePlayer(player.id)}>Delete Player</Button>
                                </TableCell>
                            </TableRow>
                        ))}

                        {
                            isAddingPlayer ? (
                                <AddPlayerForm
                                    newPlayer={newPlayer}
                                    onSubmit={handleAddPlayer}
                                    onFormChange={handleAddPlayerChange}
                                    onCancel={() => setIsAddingPlayer(false)} />
                            ) : (
                                <TableRow align="center">
                                    <TableCell colSpan="10" align="center">
                                        <Button variant="contained" onClick={() => handleAddingPlayer()}>Add new player</Button>
                                    </TableCell>
                                </TableRow>
                            )
                        }
                    </>
                )
            }
        </>
    )
}