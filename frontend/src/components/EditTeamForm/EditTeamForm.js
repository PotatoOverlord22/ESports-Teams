import { TextField, Typography, TableRow, TableCell, Button } from "@mui/material"
import { Fragment } from "react"

export default function EditTeamForm({ editTeam, editTeamNameCopy, onSubmit, onFormChange, onPlayerFormChange, onCancel }) {
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
                        data-testid="edit-name-form"
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
                        value={editTeam.region}
                        onChange={onFormChange}
                        variant="filled"
                        gutterbottom="true"
                        required
                    />
                    <br></br>
                    {
                        editTeam.players.map(player => (
                            <Fragment key={player.name}>
                                <TextField
                                    fullWidth
                                    type="text"
                                    label={player.position}
                                    name={player.name}
                                    value={player.name}
                                    onChange={onPlayerFormChange}
                                    variant="filled"
                                    gutterbottom="true"
                                />
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