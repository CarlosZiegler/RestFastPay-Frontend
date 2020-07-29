import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Navbar from '../../components/Navbar'
import api from "../../services/api";
import signupImg from "../../assets/welcome-signup-graphics.png"

import './style.css'

export default function Signup() {
    const history = useHistory()
    const [displayName, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)


    const handleSignup = async () => {
        try {
            const { data } = await api.post("/signup", {
                displayName, email, password
            });
            if (data?.hasOwnProperty('error')) {
                return setError(data.error)
            }
            history.push('/main')
        } catch (error) {
            console.log(error)
        }
    }

    return (<>
        <Navbar />
        <div className="container">
        <img className="img-big" src={signupImg} alt="signup"/>
            <h1>Signup</h1>
            <p>Enter your details and get connected!</p>
            <form className="signup-form">
                <input type="text" className="" placeholder="Display Name" required onChange={(e) => setName(e.target.value)} />
                <input type="text" className="" placeholder="Email" required onChange={(e) => setEmail(e.target.value)} />
                <input type="password" className="" placeholder="Password" required onChange={(e) => setPassword(e.target.value)} />
                <button type="button" onClick={() => handleSignup()}>Sign Up</button>
            </form>
            {error && <span>{error?.message}</span>}
        <p>Already have an account? <a href="/login">Log in!</a></p>
        </div>
    </>);
}