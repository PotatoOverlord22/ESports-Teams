import { TableRow, TableCell, Typography, Button, TextField } from "@mui/material"

export default function AddTeamForm({ newTeam, onSubmit, onFormChange, onCancel, onPlayerFormChange}) {
    return (
        <>
            <TableRow>
                <TableCell align="center" colSpan={10}>
                    <Typography variant="h6" sx={{ textAlign: "center" }}>Add a new team</Typography>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell colSpan={10} align="center">
                    <form onSubmit={onSubmit}>
                        <TextField
                            fullWidth
                            type="text"
                            label="Team name"
                            name="name"
                            value={newTeam.name}
                            variant="filled"
                            placeholder="Team name"
                            gutterbottom="true"
                            onChange={onFormChange}
                            inputProps={{
                                "data-testid": "add-name-form-field",
                            }}
                            required
                        />
                        <TextField
                            fullWidth
                            type="text"
                            label="Region"
                            name="region"
                            value={newTeam.region}
                            variant="filled"
                            placeholder="Region"
                            gutterbottom="true"
                            onChange={onFormChange}
                            inputProps={{
                                "data-testid": "add-region-form-field",
                            }}
                            required
                        />
                        <TextField
                            fullWidth
                            type="text"
                            label="Player 1 name"
                            name="name"
                            value={newTeam.players[0].name}
                            variant="filled"
                            placeholder="Player name"
                            gutterbottom="true"
                            onChange={onPlayerFormChange}
                            inputProps={{
                                "data-testid": "add-player-name-field",
                            }}
                            required
                        />
                        <TextField
                            fullWidth
                            type="text"
                            label="Player 1 position"
                            name="position"
                            value={newTeam.players[0].position}
                            variant="filled"
                            placeholder="Player position"
                            gutterbottom="true"
                            onChange={onPlayerFormChange}
                            inputProps={{
                                "data-testid": "add-player-position-field",
                            }}
                            required
                        />
                        <TextField
                            fullWidth
                            type="number"
                            label="Player 1 kda"
                            name="kda"
                            value={newTeam.players[0].kda}
                            variant="filled"
                            placeholder="Player kda"
                            gutterbottom="true"
                            onChange={onPlayerFormChange}
                            inputProps={{
                                "data-testid": "add-player-kda-field",
                            }}
                            required
                        />
                        <br></br>
                        <br></br>
                        <Button variant="contained" type="submit">Save new team</Button>
                        <br></br>
                        <br></br>
                        <Button variant="contained" onClick={onCancel}>
                            Cancel
                        </Button>
                    </form>
                </TableCell>
            </TableRow>
        </>
    )
}