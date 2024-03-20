import { TextField } from "@mui/material";
import './SearchBar.css'

export default function SearchBar({ onSearch }) {
    return (
        <TextField
            fullWidth
            placeholder="Search by region..." className="search-bar"
            type="text"
            name="search"
            variant="outlined"
            onChange={onSearch}
        />
    );
}