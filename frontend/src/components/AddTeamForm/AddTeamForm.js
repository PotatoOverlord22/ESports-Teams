import { TableRow, TableCell, Typography, Button, TextField } from "@mui/material"

export default function AddTeamForm({ newTeam, onSubmit, onFormChange, onCancel}) {
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