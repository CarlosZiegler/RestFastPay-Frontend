import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import './style.css'

export default function Logout() {
    const history = useHistory()
    const handleLogout = async () => {
        try {
            localStorage.clear()
            history.push('/')
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        handleLogout()
    }, [])

    return null;
}