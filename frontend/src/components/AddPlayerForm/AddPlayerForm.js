import { TableRow, TableCell, Typography, Button, TextField } from "@mui/material"

export default function AddPlayerForm({ newPlayer, onSubmit, onFormChange, onCancel}) {
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
                            label="Player name"
                            name="name"
                            value={newPlayer.name}
                            variant="filled"
                            placeholder="Player name"
                            gutterbottom="true"
                            onChange={onFormChange}
                            inputProps={{
                                "data-testid": "add-player-name-field",
                            }}
                            required
                        />
                        <TextField
                            fullWidth
                            type="text"
                            label="Player position"
                            name="position"
                            value={newPlayer.position}
                            variant="filled"
                            placeholder="Player position"
                            gutterbottom="true"
                            onChange={onFormChange}
                            inputProps={{
                                "data-testid": "add-player-position-field",
                            }}
                            required
                        />
                        <TextField
                            fullWidth
                            type="number"
                            label="Player kda"
                            name="kda"
                            value={newPlayer.kda}
                            variant="filled"
                            placeholder="Player kda"
                            gutterbottom="true"
                            onChange={onFormChange}
                            inputProps={{
                                "data-testid": "add-player-kda-field",
                            }}
                            required
                        />
                        <br></br>
                        <br></br>
                        <Button variant="contained" type="submit">Save new player</Button>
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