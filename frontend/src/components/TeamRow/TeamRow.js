import { useState } from "react";
import { TableRow, TableCell, Button, Typography } from "@mui/material";
import "./TeamRow.css"

export default function TeamRow({ team, onEdit, onDelete }) {
    const [moreInfo, setMoreInfo] = useState(false);

    const handleMoreInfo = () => {
        setMoreInfo(!moreInfo);
    };

    return (
        <>
            <TableRow>
                <TableCell align="center"><img src={team.logo} alt={team.name + " logo"} className="team-logo" /></TableCell>
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
        </>
    )
}