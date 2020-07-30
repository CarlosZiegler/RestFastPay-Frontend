import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Items from '../../components/Items'
import api from "../../services/api";

import './style.css'

export default function CreateItem() {
    const history = useHistory()
    const [name, setName] = useState(null)
    const [price, setPrice] = useState(null)
    const [token, setToken] = useState(localStorage.getItem('token'))
    const [error, setError] = useState(null)
    const [items, setItems] = useState([])

    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    useEffect(() => {
        getAllItemsFromAPI()
    }, [])

    const deleteItem = async (itemId) => {
        try {
            await api.delete(`/item/delete/${itemId}`, config);
            getAllItemsFromAPI()
        } catch (error) {
            console.log(error)
        }
    }

    const getAllItemsFromAPI = async () => {
        try {
            const { data } = await api.get(`/items`, config);
            console.log(data)
            if (data?.hasOwnProperty('error')) {
                return setError(data.error)
            }
            setItems(data)


        } catch (error) {
            console.log(error)
        }
    }


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
            <h1>Create Item</h1>
            <form className="create-order-form">
                <input type="text" className="" placeholder="Name" value={name} required onChange={(e) => setName(e.target.value)} />
                <input type="number" className="" placeholder="Price" value={price} step="0.01" min="0" required onChange={(e) => setPrice(Number(e.target.value))} />
                <button type="button" onClick={() => handleCreateItem()}>Create Item</button>
                {error && <span>{error?.message}</span>}
            </form>
            <div className="my-items-container">
                {items && <Items items={items} btnText='delete' fnHandlerDelete={deleteItem} />}
            </div>
        </div>
    </>);
}