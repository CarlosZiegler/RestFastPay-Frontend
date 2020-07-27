import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Navbar from '../../components/Navbar'

export default function Main() {
    const history = useHistory()
    const [token, setToken] = useState(localStorage.getItem('token'))

    useEffect(() => {
        if (!token) {
            history.push('/login')
        }
    }, [token])

    return (
        <>
            <Navbar />
            <div className="container">
                <h1>Test Main</h1>
                <h1>Token: {token}</h1>
            </div>
        </>
    );
}