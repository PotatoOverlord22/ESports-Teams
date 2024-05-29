import { API_PLAYERS_URL } from "../../Constants";
import axios from "axios";
import { TableRow, TableCell, Button, Typography, TextField } from "@mui/material";
import { useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import { useContext } from "react";

export default function PlayerRow({ player, setPlayers, fetchPlayers }) {
    const { token } = useContext(UserContext);

    const [isEditable, setIsEditable] = useState(false);
    const [editPlayer, setEditPlayer] = useState({ name: player.name, position: player.position, kda: player.kda });

    const handleDeletePlayer = (playerId) => {
        console.log('requesting delete to ', `${API_PLAYERS_URL}/${playerId}`);

        axios.delete(`${API_PLAYERS_URL}/${playerId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(() => {
                console.log("deleted player with id: ", playerId)
            })
            .catch((error) => {
                console.log("Error removing player: ", error);
            })
            .finally(() => {
                fetchPlayers();
            })
    }
    const resetEditPlayer = () => {
        setEditPlayer({ name: player.name, position: player.position, kda: player.kda });
    }

    const updatePlayersWithEditedPlayer = () =>{
        setPlayers((prevPlayers) => {
            return prevPlayers.map((player) => {
                if (player.id === editPlayer.id) {
                    return editPlayer;
                }
                return player;
            });
        })
    }

    const handleEditPlayerChange = (e) => {
        const { name, value } = e.target;
        setEditPlayer((prevPlayer) => ({
            ...prevPlayer,
            [name]: value,
        }));
        updatePlayersWithEditedPlayer();
        console.log(editPlayer);
    };

    const cancelEditPlayer = () => {
        setIsEditable(false);
        resetEditPlayer();
    }

    const handleUpdatePlayer = () => {
        axios.put(`${API_PLAYERS_URL}/${player.id}`, editPlayer, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(() => {
                console.log("Successfully updated player with id " + player.id);
            })
            .catch((error) => {
                console.log("Error updating player " + player.id + " error: " + error);
            })
            .finally(() => {
                setIsEditable(false);
                // update optimistically
                updatePlayersWithEditedPlayer();
                fetchPlayers();
            })
    }


    return (
        <>
            <TableRow key={player.id}>
                <TableCell colSpan="1" align="center">
                    <TextField
                        multiline
                        fullWidth
                        value={editPlayer.name}
                        name="name"
                        onChange={handleEditPlayerChange}
                        disabled={!isEditable}
                    />
                </TableCell>
                <TableCell colSpan="1" align="center">
                    <TextField
                        multiline
                        fullWidth
                        value={editPlayer.position}
                        name="position"
                        onChange={handleEditPlayerChange}
                        disabled={!isEditable}
                    />
                </TableCell>
                <TableCell colSpan="1" align="center">
                    <TextField
                        multiline
                        fullWidth
                        value={editPlayer.kda}
                        name="kda"
                        onChange={handleEditPlayerChange}
                        disabled={!isEditable}
                    />
                </TableCell>
                <TableCell colSpan="1" align="center">
                    {isEditable ?
                        (<>
                            <Button variant="contained"
                                role="save-edit-button"
                                onClick={() => handleUpdatePlayer()}>
                                Save Player
                            </Button>
                            <Button variant="contained"
                                role="cancel-edit-button"
                                onClick={() => cancelEditPlayer()}>
                                Cancel Edit
                            </Button>
                        </>)
                        : (<Button variant="outlined"
                            role="edit-button"
                            onClick={() => setIsEditable(!isEditable)}>
                            Edit Player
                        </Button>)
                    }
                    <Button variant="outlined"
                        onClick={() => handleDeletePlayer(player.id)}>Delete Player</Button>
                </TableCell>
            </TableRow>
        </>
    )
}