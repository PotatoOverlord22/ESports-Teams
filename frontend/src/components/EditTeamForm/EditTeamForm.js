import { TextField, Typography, TableRow, TableCell, Button } from "@mui/material"
import { Fragment } from "react"

export default function EditTeamForm({ editTeam, editTeamNameCopy, onSubmit, onFormChange, onPlayerFormChange, onCancel, players }) {
    return (
        <TableRow>
            <TableCell colSpan={10} align="center">
                <Typography variant="h5" sx={{ textAlign: "center", fontWeight: 'bold' }}>Edit {editTeamNameCopy}</Typography>
                <form onSubmit={onSubmit}>
                    <TextField
                        fullWidth
                        type="text"
                        label="Name"
                        name="name"
                        inputProps={{
                            "data-testid": "edit-name-form-field",
                        }}
                        value={editTeam.name}
                        onChange={onFormChange}
                        variant="filled"
                        gutterbottom="true"
                        required
                    />
                    <br></br>
                    <TextField
                        fullWidth
                        type="text"
                        label="Region"
                        name="region"
                        inputProps={{
                            "data-testid": "edit-region-form-field",
                        }}
                        value={editTeam.region}
                        onChange={onFormChange}
                        variant="filled"
                        gutterbottom="true"
                        required
                    />
                    <br></br>
                    <br></br>
                    {
                        players.map(player => (
                            <Fragment key={player.id}>
                                <TextField
                                    type="text"
                                    label="Player Name"
                                    name="name"
                                    inputProps={{
                                        "data-testid": "edit-player-name-form-field",
                                    }}
                                    value={player.name}
                                    onChange={(event) => onPlayerFormChange(event, player.id)}
                                    variant="outlined"
                                    gutterbottom="true"
                                />
                                <TextField
                                    type="text"
                                    label="Position"
                                    name="position"
                                    inputProps={{
                                        "data-testid": "edit-player-position-form-field",
                                    }}
                                    value={player.position}
                                    onChange={(event) => onPlayerFormChange(event, player.id)}
                                    variant="outlined"
                                    gutterbottom="true"
                                />
                                <TextField
                                    type="number"
                                    label="kda"
                                    name="kda"
                                    inputProps={{
                                        "data-testid": "edit-player-kda-form-field",
                                    }}
                                    value={player.kda}
                                    onChange={(event) => onPlayerFormChange(event, player.id)}
                                    variant="outlined"
                                    gutterbottom="true"
                                />
                                <br></br>
                                <br></br>
                            </Fragment>
                        ))
                    }
                    <br></br>
                    <Button type="submit" variant="contained" gutterbottom="true">
                        Save Edit
                    </Button>
                    <br></br>
                    <br></br>
                    <Button variant="contained" onClick={onCancel}>
                        Cancel
                    </Button>

                </form>
            </TableCell>
        </TableRow>
    )
}