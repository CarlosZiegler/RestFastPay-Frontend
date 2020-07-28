import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Navbar from '../../components/Navbar'
import api from "../../services/api";

import './style.css'

export default function CreateItem() {
    const history = useHistory()
    const [name, setName] = useState(null)
    const [price, setPrice] = useState(null)
    const [urlImage, setUrlImage] = useState(null)
    const [token, setToken] = useState(localStorage.getItem('token'))
    const [error, setError] = useState(null)


    const handleCreateItem = async () => {
        try {
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            const { data } = await api.post("/item/create", {
                name, price
            }, config);
            console.log(data)
            if (data?.hasOwnProperty('error')) {
                return setError(data.error)
            }
            setName('')
            setPrice('')
        } catch (error) {
            console.log(error)
        }
    }

    return (<>
        <Navbar />
        <div className="container">
            <h1>Create Table</h1>
            <form className="create-order-form">
                <input type="text" className="" placeholder="Name" value={name} required onChange={(e) => setName(e.target.value)} />
                <input type="number" className="" placeholder="Price" value={price} step="0.01" min="0" required onChange={(e) => setPrice(Number(e.target.value))} />
                <button type="button" onClick={() => handleCreateItem()}>Create Item</button>
                {error && <span>{error?.message}</span>}
            </form>
        </div>
    </>);
}