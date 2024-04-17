import { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';


export default function RegionMenu({ regionCategories, onRegionSelect }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = (region) => {
        setAnchorEl(null);
        onRegionSelect(region);
    };

    const handleTopClose = () =>{
        setAnchorEl(null);
        onRegionSelect("");
    }

    return (
        <div>
            <Button 
                onClick={handleClick}
                variant='outlined'
            >
                Region
            </Button>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleTopClose}
            >
                {regionCategories.map(region => (
                    <MenuItem
                        key={region}
                        onClick={() => handleClose(region)}
                    >
                        {region}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
}