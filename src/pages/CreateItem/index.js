import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Items from '../../components/Items'
import api from "../../services/api";
import ImageItems from "../../assets/undraw_breakfast_psiw.svg";

import './style.css'

export default function CreateItem() {
    const history = useHistory()
    const [name, setName] = useState('')
    const [category, setCategory] = useState('food')
    const [price, setPrice] = useState('')
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
            if (!name || !price || !category) {
                alert('Item NEED name, price and category')
                return
            }
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            const { data } = await api.post("/item/create", {
                name, price, category: category
            }, config);
            console.log(data)
            if (data?.hasOwnProperty('error')) {
                return setError(data.error)
            }
            setName('')
            setPrice('')
            getAllItemsFromAPI()
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        console.log(category)
    }, [category])


    return (<>
        <Navbar />
        <div className="container">
            <div className="img-container">
                <img className="img-big" src={ImageItems} alt="foods" />
            </div>
            <div className="back-button">
                <Link className="btn-back" to={`/main`}> ← Orders Overview</Link>

            </div>
            <form className="create-item-form">
                <label className="item-create-label" htmlFor="category">
                    Name:
                <input type="text" className="input-name-item" required placeholder="Enter Name" value={name} required onChange={(e) => setName(e.target.value)} />
                </label>
                <div className="form-group-container">
                    <label className="item-create-label" htmlFor="category">
                        Category
                    <select name="category" className="category" required id="category" onChange={(e) => setCategory(e.target.value)} required >
                            <option value='food'>food</option>
                            <option value='drink'>drink</option>
                        </select>
                    </label>
                    <label className="item-create-label" htmlFor="category">
                        Price
                    <input type="number"
                            className="input-item-price" placeholder="Price" required
                            value={price} step="0.01" min="0" onChange={(e) => setPrice(Number(e.target.value))} />
                    </label>
                    <button type="button" className="btn-green btn-create-item" onClick={() => handleCreateItem()}>Create Item</button>
                </div>
                {error && <span>{error?.message}</span>}
            </form>
            <div className="items-container">
                {items && <Items items={items} btnText='delete' fnHandlerDelete={deleteItem} />}
            </div>
        </div>
    </>);
}