import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
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
        <div className="content">
            <img className="img-big" src={signupImg} alt="signup" />
            <h1 className="no-margin text-navy">Signup</h1>
            <p className="no-margin text-gray">Enter your details and get connected!</p>
            <br />
            <form className="signup-form">
                <input type="text" className="" placeholder="Display Name" required onChange={(e) => setName(e.target.value)} />
                <input type="text" className="" placeholder="Email" required onChange={(e) => setEmail(e.target.value.toLowerCase())} />
                <input type="password" className="" placeholder="Password" required onChange={(e) => setPassword(e.target.value)} />
                <button className="btn-coral" type="button" onClick={() => handleSignup()}>Sign Up</button>
            </form>
            {error && <span>{error?.message}</span>}
            <br />
            <p className="text-gray">Already have an account? <a className="text-coral" href="/login">Log in!</a></p>
        </div>
    </>);
}