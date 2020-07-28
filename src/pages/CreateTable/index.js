import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Navbar from '../../components/Navbar'
import api from "../../services/api";

import './style.css'

export default function CreateTable() {
    const history = useHistory()
    const [number, setNumber] = useState('')
    const [token, setToken] = useState(localStorage.getItem('token'))
    const [error, setError] = useState('')


    const handleCreateTable = async () => {
        try {
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            const { data } = await api.post("/table/create", {
                number
            }, config);
            if (data?.hasOwnProperty('error')) {
                return setError(data.error)
            }
            console.log(data)
            setNumber('')
            setError('')


        } catch (error) {
            console.log(error)
        }
    }

    return (<>
        <Navbar />
        <div className="container">
            <h1>Create Table</h1>
            <form className="create-order-form">
                <input type="number" className="" value={number} placeholder="Number" required onChange={(e) => setNumber(e.target.value)} />
                <button type="button" onClick={() => handleCreateTable()}>Create</button>
                {error && <span>{error?.message}</span>}
            </form>
        </div>
    </>);
}