import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Navbar from '../../components/Navbar'
import api from "../../services/api";
import loginImg from "../../assets/login-graphics.png";

import './style.css'

export default function Login() {
    const history = useHistory()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)


    const handleLogin = async () => {
        try {
            const { data } = await api.post("/login", {
                email, password
            });
            if (data?.hasOwnProperty('error')) {
                return setError(data.error)
            }
            localStorage.clear()
            localStorage.setItem('token', data?.token)
            history.push('/main')
        } catch (error) {
            console.log(error)
        }
    }

    return (<>
        <Navbar />
        <div className="container">
        <img className="img-big" src={loginImg} alt="login"/>
            <h1>Login</h1>
            <p>Welcome back!</p>
            <br />
            <form className="login-form">
                <input type="text" className="" placeholder="Email" required onChange={(e) => setEmail(e.target.value)} />
                <input type="password" className="" placeholder="Password" required onChange={(e) => setPassword(e.target.value)} />
                <button type="button" onClick={() => handleLogin()}>LOGIN</button>
                {error && <span>{error?.message}</span>}
            </form>
            <br />
            <p>Don't have an account? <a href="../Signup">Sign up!</a> </p>
        </div>
    </>);
}