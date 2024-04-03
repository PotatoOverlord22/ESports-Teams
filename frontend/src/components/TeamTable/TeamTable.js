import { Fragment, useState, useEffect } from "react";
import axios from 'axios';
import "./TeamTable.css"
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Grid, TextField, Pagination } from "@mui/material";
import TeamRow from "../TeamRow/TeamRow";
import AddTeamForm from "../AddTeamForm/AddTeamForm";
import EditTeamForm from "../EditTeamForm/EditTeamForm";
import SearchBar from "../SearchBar/SearchBar";
import RegionPieChart from "../RegionPieChart/RegionPieChart";
import DropdownNumbers from "../DropdownNumbers/DropdownNumbers";
import { API_TEAMS_URL } from "../../Constants"

export default function TeamTable({ teams, itemsPerPage = 5 }) {

    const [allTeams, setAllTeams] = useState(teams);
    const [teamsPerPage, setTeamsPerPage] = useState(itemsPerPage);
    const [currentPage, setCurrentPage] = useState(1);

    const fetchTeams = async () => {
        try {
            const response = await axios.get(`${API_TEAMS_URL}`);
            console.log('fetched teams: ', response.data);
            setAllTeams(response.data);
        } catch (error) {
            console.error('Error fetching teams: ', error);
        }
    }

    // total number of pages
    const [totalPages, setTotalPages] = useState(Math.ceil(allTeams.length / teamsPerPage));

    let indexOfLastTeam = teamsPerPage;
    let indexOfFirstTeam = indexOfLastTeam - teamsPerPage;

    const firstPageTeams = allTeams.slice(indexOfFirstTeam, indexOfLastTeam);
    const [displayedTeams, setDisplayedTeams] = useState(firstPageTeams);
    const [currentPageTeams, setCurrentPageTeams] = useState(firstPageTeams);

    useEffect(() => {
        setDisplayedTeams(currentPageTeams);
    }, [currentPageTeams])

    useEffect(() => {
        setTotalPages(Math.ceil(allTeams.length / teamsPerPage))
    }, [allTeams, teamsPerPage])

    useEffect(() => {
        handlePagination(currentPage);
    }, [allTeams])

    const handleTeamsPerPageChange = (numberOfTeams) => {
        setTeamsPerPage(numberOfTeams);
        indexOfLastTeam = currentPage * numberOfTeams;
        indexOfFirstTeam = indexOfLastTeam - numberOfTeams;
        setCurrentPageTeams(allTeams.slice(indexOfFirstTeam, indexOfLastTeam));
    }

    const handlePagination = (pageNumber) => {
        // calculate index ranges in teams for the current page
        indexOfLastTeam = pageNumber * teamsPerPage;
        indexOfFirstTeam = indexOfLastTeam - teamsPerPage;
        setCurrentPageTeams(allTeams.slice(indexOfFirstTeam, indexOfLastTeam));
        setCurrentPage(pageNumber);
    }

    const [isAddingTeam, setIsAddingTeam] = useState(false);
    const [newTeam, setNewTeam] = useState({ name: '', region: '', players: [{ id: 1, name: '', position: '', kda: 0 }] });

    const [editTeam, setEditTeam] = useState(null);
    const [editTeamName, setEditTeamName] = useState(null);


    const handleAddingTeam = () => {
        setIsAddingTeam(!isAddingTeam);
    }

    const handleDeleteTeam = (teamId) => {
        console.log('requesting delete to ', `${API_TEAMS_URL}/${teamId}`);
        // update optimistically
        setAllTeams(allTeams.filter(team => team.id !== teamId))

        axios.delete(`${API_TEAMS_URL}/${teamId}`)
            .then(() => {
                console.log("deleted team with id: ", teamId)
            })
            .catch((error) => {
                console.log("Error removing team: ", error);
                // get the correct teams
                fetchTeams();
            })
    }

    const handleEditTeam = (teamId) => {
        const selectedTeamToEdit = displayedTeams.find((team) => team.id === teamId)
        setEditTeamName(selectedTeamToEdit.name)
        setEditTeam(selectedTeamToEdit)
    }

    const handleSaveEdit = (event) => {
        event.preventDefault();

        console.log('requesting update to ', `${API_TEAMS_URL}/${editTeam.id}`)
        // Update optimistically
        const index = allTeams.findIndex(team => team.id === editTeam.id)
        const newEditedTeams = [...allTeams]
        newEditedTeams[index] = editTeam
        setAllTeams(newEditedTeams)
        setEditTeamName(null)
        setEditTeam(null)

        axios.post(`${API_TEAMS_URL}/${editTeam.id}`, editTeam)
            .then(() => {
                console.log("edited team: ", editTeam.id)
            })
            .catch((error) => {
                console.log("Error editing team: ", error);
                fetchTeams();
            })
    }

    const handleEditFieldChange = (e) => {
        const { name, value } = e.target;
        setEditTeam((prevEditTeam) => ({
            ...prevEditTeam, [name]: value
        }))
    }

    const handleEditPlayerChange = (e, playerId) => {
        const { name, value } = e.target;
        const playerToUpdateIndex = editTeam.players.findIndex(player => player.id === playerId)
        const updatedPlayers = [...editTeam.players];

        updatedPlayers[playerToUpdateIndex] = {
            ...updatedPlayers[playerToUpdateIndex],
            [name]: value
        };

        setEditTeam(prevEditTeam => ({
            ...prevEditTeam,
            players: updatedPlayers
        }));
    }

    const handleAddChange = (e) => {
        const { name, value } = e.target;
        setNewTeam((prevTeam) => ({
            ...prevTeam,
            [name]: value,
        }));
    };

    const handlePlayerAddChange = (e) => {
        // TODO: proper logic for multiple player additions
        // note: [name] <=> field we are changing
        const { name, value } = e.target;
        setNewTeam(prevTeam => ({
            ...prevTeam,
            players: [{
                ...prevTeam.players[0],
                [name]: value
            }]
        }));
    }


    const handleAddTeam = (event) => {
        event.preventDefault();
        const newTeamWithId = { ...newTeam, id: Math.max(...allTeams.map(team => team.id)) + 1 }
        // Update local state optimistically
        setAllTeams([...allTeams, newTeamWithId]);
        setIsAddingTeam(false);
        setNewTeam({ name: '', region: '', players: [{ id: 1, name: '', position: '', kda: '' }] });

        axios.post(`${API_TEAMS_URL}`, newTeamWithId)
            .then(() => {
                console.log("posted team: ", newTeamWithId);
            })
            .catch(error => {
                console.log("Error adding team: ", error);
                // Get the correct teams
                fetchTeams();
            });
    }

    const handleSearch = (event) => {
        const { value } = event.target
        setDisplayedTeams(currentPageTeams)
        const filteredTeams = currentPageTeams.filter(team => team.region.toLowerCase().match(value.toLowerCase()))
        setDisplayedTeams(filteredTeams)
    }

    return (
        <>
            <Paper elevation={14}>
                <Typography variant="h3" gutterBottom>Esports teams</Typography>
            </Paper>

            <TableContainer component={Paper} elevation={14}>
                <Table className="team-table-style">
                    <TableHead>
                        <TableRow>
                            <TableCell><Typography variant="h4" sx={{ textAlign: "center", fontWeight: "bold" }}>Logo</Typography></TableCell>
                            <TableCell><Typography variant="h4" sx={{ textAlign: "center", fontWeight: "bold" }}>Team Name</Typography></TableCell>
                            <TableCell><Typography variant="h4" sx={{ textAlign: "center", fontWeight: "bold" }}>Region</Typography></TableCell>
                            <TableCell><Typography variant="h4" sx={{ textAlign: "center", fontWeight: "bold" }}>Actions</Typography></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell colSpan={10} align="center">
                                <SearchBar onSearch={handleSearch} />
                            </TableCell>
                        </TableRow>
                        {displayedTeams.map((team) => (
                            <TeamRow key={team.id} team={team} onEdit={handleEditTeam} onDelete={handleDeleteTeam} />
                        ))}
                        {
                            isAddingTeam ? (
                                <AddTeamForm
                                    newTeam={newTeam}
                                    onSubmit={handleAddTeam}
                                    onFormChange={handleAddChange}
                                    onCancel={() => setIsAddingTeam(false)}
                                    onPlayerFormChange={handlePlayerAddChange} />
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={10} align="center">
                                        <Button variant="contained" onClick={() => handleAddingTeam()}>Add new team</Button>
                                    </TableCell>
                                </TableRow>
                            )
                        }
                        {
                            editTeam && <EditTeamForm
                                editTeam={editTeam}
                                editTeamNameCopy={editTeamName}
                                onSubmit={handleSaveEdit}
                                onFormChange={handleEditFieldChange}
                                onPlayerFormChange={handleEditPlayerChange}
                                onCancel={() => { setEditTeam(null) }} />
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <div style={{ display: 'flex', marginTop: "20px", alignItems: 'center', justifyContent: 'center' }}>
                <RegionPieChart listOfTeams={allTeams} />
            </div>

            <div style={{ display: 'flex', marginTop: "20px", alignItems: 'center', justifyContent: 'center' }}>
                <Pagination count={totalPages} onChange={(event, page) => handlePagination(page)} size="large" color="primary"
                    data-testid="pagination"
                />
            </div>
            <DropdownNumbers maxLength={allTeams.length} step={3} onChange={handleTeamsPerPageChange} title="Teams per page" />
        </>
    );
}