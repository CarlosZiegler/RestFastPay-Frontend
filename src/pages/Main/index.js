import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Navbar from '../../components/Navbar'
import api from "../../services/api";

import './style.css'


export default function Main() {
    const history = useHistory()
    const [token, setToken] = useState(localStorage.getItem('token'))
    const [orders, setOrders] = useState(localStorage.getItem([]))
    const [error, setError] = useState(localStorage.getItem(null))

    useEffect(() => {
        if (!token) {
            history.push('/login')
        }
    }, [token])

    const getAllOrders = async () => {
        try {
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            const { data } = await api.get("/orders", config);
            if (data?.hasOwnProperty('error')) {
                return setError(data.error)
            }
            setOrders(data)
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getAllOrders()
    }, [])

    return (
        <>
            <Navbar />
            <div className="container">
                <h1>Test Main</h1>
                <button onClick={() => getAllOrders()}>Get Info</button>
            </div>
            <div>
                {orders && orders.map(order => {
                    return (<div className="order-item" key={order._id}>
                        <p>Order ID:{order._id}</p>
                        <p>Table Number:{order.tableId?.number}</p>
                        <p>Subtotal: {order.subtotal}</p>
                        <p>Vat     : {order.vat}</p>
                        <p>Total   : {order.total}</p>
                        <p>Status  : {order.status}</p>
                    </div>)
                })}
            </div>

        </>
    );
}