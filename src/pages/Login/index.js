import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom'

import api from "../../services/api";

export default function Home() {

    const [newToken, setNewToken] = useState('')
    const history = useHistory()

    const handleLogin = async () => {
        try {
            const { data: { token } } = await api.post("/login", {
                "email": "usertester@example.com",
                "password": "12345678"
            });
            setNewToken(token);
            localStorage.clear()
            localStorage.setItem('token', token)
            history.push('/main')


        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="container">
            <h1>Login</h1>
            <h2>Token: {newToken}</h2>
            <button type="button" onClick={() => handleLogin()}>Login</button>
        </div>
    );
}