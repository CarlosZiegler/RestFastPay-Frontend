import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import api from "../../services/api";

export default function Home() {
    const history = useHistory()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [newToken, setNewToken] = useState('')
    const [error, setError] = useState(null)


    const handleLogin = async () => {
        try {
            const { data } = await api.post("/login", {
                email, password
            });
            if (data?.hasOwnProperty('error')) {
                return setError(data.error)
            }
            setNewToken(data.token);
            localStorage.clear()
            localStorage.setItem('token', data?.token)
            history.push('/main')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="container">
            <h1>Login</h1>
            <form>
                <input type="text" className="" placeholder="Email" required onChange={(e) => setEmail(e.target.value)} />
                <input type="password" className="" placeholder="Password" required onChange={(e) => setPassword(e.target.value)} />
                <button type="button" onClick={() => handleLogin()}>Login</button>
            </form>
            {error && <span>{error?.message}</span>}
        </div>
    );
}