import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Navbar from '../../components/Navbar'
import api from "../../services/api";

import './style.css'

export default function Signup() {
    const history = useHistory()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)


    const handleLogin = async () => {
        try {
            const { data } = await api.post("/signup", {
                email, password
            });
            if (data?.hasOwnProperty('error')) {
                return setError(data.error)
            }
            history.push('/login')
        } catch (error) {
            console.log(error)
        }
    }

    return (<>
        <Navbar />
        <div className="container">
            <h1>Signup</h1>
            <form className="signup-form">
                <input type="text" className="" placeholder="Email" required onChange={(e) => setEmail(e.target.value)} />
                <input type="password" className="" placeholder="Password" required onChange={(e) => setPassword(e.target.value)} />
                <button type="button" onClick={() => handleLogin()}>Login</button>
            </form>
            {error && <span>{error?.message}</span>}
        </div>
    </>);
}