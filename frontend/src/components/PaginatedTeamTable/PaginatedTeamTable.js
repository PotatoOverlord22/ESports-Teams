import TeamTable from "../TeamTable/TeamTable";
import { API_TEAMS_URL, API_REGION_DATA_URL, DEFAULT_STARTING_PAGE_NUMBER, DEFAULT_DROPDOWN_STEP } from "../../Constants";
import { useState, useEffect } from "react";
import axios from 'axios';
import { Pagination } from "@mui/material"
import DropdownNumbers from "../DropdownNumbers/DropdownNumbers";
import RegionPieChart from "../TeamRegionPieChart/TeamRegionPieChart";
import SearchBar from "../SearchBar/SearchBar";

export default function PaginatedTeamTable({ itemsPerPage }) {
    const [teams, setTeams] = useState([]);

    // Pagination
    const [isLoading, setIsLoading] = useState(true);
    const [teamsPerPage, setTeamsPerPage] = useState(itemsPerPage);
    const [currentPage, setCurrentPage] = useState(DEFAULT_STARTING_PAGE_NUMBER);
    // total number of pages, this will be set when fetching data from backend
    const [totalPages, setTotalPages] = useState(0);

    // Pie chart
    const [pieChartData, setPieChartData] = useState([]);

    // Search
    const [searchQuery, setSearchQuery] = useState("");

    const fetchTeamsPage = async (page = currentPage, itemsPerPage = teamsPerPage, search = searchQuery) => {
        try {
            const response = await axios.get(API_TEAMS_URL + `?page=${page}&pageSize=${itemsPerPage}&search=${search}`);
            setIsLoading(false);
            setTeams(response.data.teams);
            setTotalPages(response.data.totalPages);
            setCurrentPage(page);
            setTeamsPerPage(itemsPerPage);
            console.log("total pages: ", totalPages);
            console.log("current page: ", currentPage);
            console.log("teams per page: ", teamsPerPage);
            console.log('fetched teams: ', response.data.teams);
        } catch (error) {
            console.error('Error fetching teams: ', error);
            setIsLoading(true);
        }
    }

    const fetchPieChartData = () => {
        axios.get(API_REGION_DATA_URL)
            .then(response => {
                console.log("Fetched piechart data: ", response.data);
                setPieChartData(response.data);
            })
            .catch(error => {
                console.log("Error fetching piechart data: ", error);
            })
    }

    useEffect(() => {
        fetchTeamsPage();
    }, [])

    useEffect(() => {
        fetchPieChartData();
    }, [teams])

    const handlePagination = (pageNumber) => {
        // calculate index ranges in teams for the current page
        console.log("handling pagination", pageNumber)
        fetchTeamsPage(pageNumber, teamsPerPage);
    }

    const handleTeamsPerPageChange = (numberOfTeams) => {
        fetchTeamsPage(currentPage, numberOfTeams);
    }

    // Search
    const handleSearch = (event) => {
        const { value } = event.target
        setSearchQuery(value);
        fetchTeamsPage(DEFAULT_STARTING_PAGE_NUMBER, teamsPerPage, value);
    }

    return (
        <>
            {isLoading ? (
                <p>Loading teams...</p>
            ) : (
                <>
                <SearchBar onSearch={handleSearch} />
                    <TeamTable teams={teams} setTeams={setTeams} fetchTeams={fetchTeamsPage}></TeamTable>
                    <div style={{ display: 'flex', marginTop: "20px", alignItems: 'center', justifyContent: 'center' }}>
                        <Pagination count={totalPages} onChange={(event, page) => { handlePagination(page) }} size="large" color="primary"
                            data-testid="pagination"
                        />
                    </div>
                    <div style={{ display: 'flex', marginTop: "20px", alignItems: 'center', justifyContent: 'center' }}>
                        <RegionPieChart data={pieChartData}/>
                    </div>
                    <DropdownNumbers maxLength={totalPages * teamsPerPage} step={DEFAULT_DROPDOWN_STEP} onChange={handleTeamsPerPageChange} title="Teams per page" />
                </>
            )}
        </>
    )

}