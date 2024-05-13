import { TextField, Typography, TableRow, TableCell, Button } from "@mui/material"
import { Fragment } from "react"

export default function EditTeamForm({ editTeam, editTeamNameCopy, onSubmit, onFormChange, onCancel }) {
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