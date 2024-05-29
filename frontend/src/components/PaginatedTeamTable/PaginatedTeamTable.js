import TeamTable from "../TeamTable/TeamTable";
import { API_TEAMS_URL, API_REGION_DATA_URL, DEFAULT_STARTING_PAGE_NUMBER, DEFAULT_DROPDOWN_STEP, API_REGION_CATEGORIES_URL, WEBSOCKET_BASE_URL, REGION_DATA_SOCKET_URL } from "../../Constants";
import { useState, useEffect } from "react";
import axios from 'axios';
import { Pagination } from "@mui/material"
import DropdownNumbers from "../DropdownNumbers/DropdownNumbers";
import RegionPieChart from "../TeamRegionPieChart/TeamRegionPieChart";
import RegionMenu from "../RegionMenu/RegionMenu";
import Stomp from "stompjs";
import SockJS from "sockjs-client";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

export default function PaginatedTeamTable({ itemsPerPage }) {

    const { token } = useContext(UserContext);
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
    const [searchRegion, setSearchRegion] = useState("");

    // Region menu
    const [regionCategories, setRegionCategories] = useState([]);

    const fetchTeamsPageData = async (page = currentPage, itemsPerPage = teamsPerPage, region = searchRegion) => {
        try {
            const teamPageResponse = await axios.get(API_TEAMS_URL + `?page=${page}&pageSize=${itemsPerPage}&region=${region}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            setIsLoading(false);
            setTeams(teamPageResponse.data.content);
            setTotalPages(teamPageResponse.data.totalPages);
            setCurrentPage(page);
            setTeamsPerPage(itemsPerPage);
            console.log('fetched teams: ', teamPageResponse.data.content);
        } catch (error) {
            console.error('Error fetching teams: ', error);
            setIsLoading(true);
        }
    }

    const fetchPieChartData = () => {
        axios.get(API_REGION_DATA_URL, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                console.log("Fetched piechart data: ", response.data);
                setPieChartData(response.data);
            })
            .catch(error => {

                console.log("Error fetching piechart data: ", error);
            })
    }

    const fetchRegionCategories = () => {
        axios.get(API_REGION_CATEGORIES_URL, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                console.log("Fetched region categories: ", response.data)
                setRegionCategories(response.data);
            })
            .catch(error => {
                console.log("Error fetching region categories: ", error);
            })
    }

    useEffect(() => {
        fetchTeamsPageData();

        const pieChartSocket = new SockJS(WEBSOCKET_BASE_URL)
        const stompClient = Stomp.over(pieChartSocket);

        stompClient.connect({}, () => {
            stompClient.subscribe('/topic/regionData', (message) => {
                setPieChartData(JSON.parse(message.body));
            })
        }, (error) => {
            console.log("error subscribing: ", error);
        })
    }, [])

    useEffect(() => {
        fetchPieChartData();
        fetchRegionCategories()
    }, [teams])

    const handlePagination = (pageNumber) => {
        // calculate index ranges in teams for the current page
        console.log("handling pagination", pageNumber)
        fetchTeamsPageData(pageNumber, teamsPerPage);
    }

    const handleTeamsPerPageChange = (numberOfTeams) => {
        fetchTeamsPageData(currentPage, numberOfTeams);
    }

    // Search
    const handleSearch = (event) => {
        const { value } = event.target
        setSearchRegion(value);
        fetchTeamsPageData(DEFAULT_STARTING_PAGE_NUMBER, teamsPerPage, value);
    }

    // Menu
    const handleRegionSelect = (region) => {
        console.log(region);
        setSearchRegion(region);
        fetchTeamsPageData(DEFAULT_STARTING_PAGE_NUMBER, teamsPerPage, region)
    }

    // 

    return (
        <>
            {isLoading ? (
                <p>Loading teams...</p>
            ) : (
                <>
                    <RegionMenu regionCategories={regionCategories} onRegionSelect={handleRegionSelect} />
                    <TeamTable teams={teams} setTeams={setTeams} fetchTeams={fetchTeamsPageData}></TeamTable>
                    <div style={{ display: 'flex', marginTop: "20px", alignItems: 'center', justifyContent: 'center' }}>
                        <Pagination count={totalPages} onChange={(event, page) => { handlePagination(page) }} size="large" color="primary"
                            data-testid="pagination"
                        />
                    </div>
                    <div style={{ display: 'flex', marginTop: "20px", alignItems: 'center', justifyContent: 'center' }}>
                        <RegionPieChart data={pieChartData} />
                    </div>
                    <DropdownNumbers maxLength={totalPages * teamsPerPage} step={DEFAULT_DROPDOWN_STEP} onChange={handleTeamsPerPageChange} title="Teams per page" />
                </>
            )}
        </>
    )

}