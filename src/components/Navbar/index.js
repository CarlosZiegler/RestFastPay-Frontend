import React from "react";

import Logo from '../../assets/Logo.svg'
import MenuButton from '../MenuButton'

import './style.css'

function Navbar() {

    return (
        <header className="navbar">
            <img className="navbar-img" src={Logo} alt="OSL" />
            <MenuButton />
        </header>
    );
}

export default Navbar;