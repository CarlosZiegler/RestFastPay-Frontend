import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Navbar from '../../components/Navbar'
import Tables from '../../components/Tables'
import api from "../../services/api";

import tableImg from "../../assets/createtable-graphic.png"

import './style.css'

export default function CreateTable() {
    const history = useHistory()
    const [number, setNumber] = useState('')
    const [token, setToken] = useState(localStorage.getItem('token'))
    const [error, setError] = useState('')
    const [tables, setTables] = useState([])


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
            setNumber('')
            await getAllTables()

            //setError('')
        } catch (error) {
            console.log(error)
        }
    }

    const getAllTables = async () => {
        try {
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            const { data } = await api.get("/tables", config);
            if (data?.hasOwnProperty('error')) {
                return setError(data.error)
            }
            setTables(data)

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getAllTables()
    }, [])


    const deleteTable = async (tableId) => {
        try {
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            await api.delete(`/table/delete/${tableId}`, config);
            await getAllTables()

        } catch (error) {
            console.log(error)
        }
    }

    return (<>
        <Navbar />
        <div className="content">
            <img className="img-big" src={tableImg} alt="table" style={{ width: "200px" }} />
            <div className="back-button">
                <Link className="btn-back" to={`/main`}> ← Orders Overview</Link>
            </div>
            <h1 className="no-margin">Create Table</h1>
            <form className="create-table-form">
                <input type="number" className="" value={number} placeholder="Number" required onChange={(e) => setNumber(e.target.value)} />
                <button className="btn-add" type="button" onClick={() => handleCreateTable()}>Create</button>
                {error && <span>{error?.message}</span>}
            </form>
            {tables.length > 0 && <div className="tables-container">
                <Tables tables={tables} handleTableDelete={deleteTable} />
            </div>
            }
            {tables.length < 1 && <h3>No Tables to show</h3>}
        </div>
    </>);
}