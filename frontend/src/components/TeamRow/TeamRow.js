import { useState } from "react";
import axios from 'axios';
import { TableRow, TableCell, Button, Typography} from "@mui/material";
import "./TeamRow.css"
import { API_PLAYERS_URL, API_TEAMS_URL } from "../../Constants";
import AddPlayerForm from "../AddPlayerForm/AddPlayerForm";
import PlayerRow from "../PlayerRow/PlayerRow";

export default function TeamRow({ team, onEdit, onDelete }) {
    const [players, setPlayers] = useState(team.players);
    const [moreInfo, setMoreInfo] = useState(false);
    const [newPlayer, setNewPlayer] = useState({ name: '', position: '', kda: '' });

    const [isAddingPlayer, setIsAddingPlayer] = useState(false);

    const fetchPlayers = async () => {
        try {
            const playersResponse = await axios.get(API_TEAMS_URL + `/${team.id}/players`);
            setPlayers(playersResponse.data);
            console.log('fetched players: ', playersResponse.data);
        } catch (error) {
            console.error('Error fetching players: ', error);
        }
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
        const playerToSend = { ...newPlayer, teamId: team.id }
        console.log("player to send: " + playerToSend.name + ", teamId: " + playerToSend.teamId);

        axios.post(API_PLAYERS_URL, playerToSend)
            .then(() => {
                fetchPlayers();
            })
            // TODO proper error handling for each error case
            .catch(error => {
                console.log("Error adding team: ", error);
                // Get the correct teams
                fetchPlayers();
            });

        setIsAddingPlayer(false);
        setNewPlayer({ teamId: 0, name: '', position: '', kda: '' });
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
                            <PlayerRow player={player} setPlayers={setPlayers} fetchPlayers={fetchPlayers} key={player.id}/>
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