import React from 'react';


import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import btnMenu from '../../assets/btn-menu.svg'

import './style.css'


export default function SimpleMenu() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const token = localStorage.getItem('token')

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }



    return (

        <div>
            <Button color="primary" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                <img src={btnMenu} alt="Open Menu" />
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose}>
                    <a href="/" className="menu-item">Home</a>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <a href="/login" className="menu-item">Login</a>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <a href="/signup" className="menu-item">Signup</a>
                </MenuItem>
                {token && (
                    <div>
                        <MenuItem onClick={handleClose}>
                            <a href="/main" className="menu-item">Main</a>
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                            <a href="/logout" className="menu-item">Logout</a>
                        </MenuItem>
                    </div>)
                }

            </Menu>
        </div>
    );
}