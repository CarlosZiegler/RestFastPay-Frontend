import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Lottie from 'react-lottie'
import Navbar from '../../components/Navbar'
import Orders from '../../components/Orders'
import SearchBar from '../../components/SearchBar'
import FilterBy from '../../components/FilterBy'
import api from "../../services/api";


import listDataAnimation from '../../assets/lotties/19465-scrolling-through-mobile.json'
import createOrderDataAnimation from '../../assets/lotties/14157-patient-successfully-added.json'
import createItemDataAnimation from '../../assets/lotties/4762-food-carousel.json'
import createTableDataAnimation from '../../assets/lotties/25233-digital-desgin.json'

import './style.css'

//config lottie file
const defaultOptionsAnimation = {
    loop: true,
    autoplay: true,
    animationData: listDataAnimation,

};
//config lottie file
const defaultOptionsAnimationOrder = {
    loop: true,
    autoplay: true,
    animationData: createOrderDataAnimation,

};
//config lottie file
const defaultOptionsAnimationItem = {
    loop: true,
    autoplay: true,
    animationData: createItemDataAnimation,

};
//config lottie file
const defaultOptionsAnimationTable = {
    loop: true,
    autoplay: true,
    animationData: createTableDataAnimation,

};


export default function Main() {
    const history = useHistory()
    const [token, setToken] = useState(localStorage.getItem('token'))
    const [orders, setOrders] = useState([])
    const [showOrders, setShowOrders] = useState([])
    const [findField, setFindField] = useState('')
    const [orderStatus, setOrderStatus] = useState('all')
    const [error, setError] = useState(null)

    useEffect(() => {
        if (!token) {
            history.push('/login')
        }
    }, [token])

    useEffect(() => {
        setShowOrders(orders)
    }, [orders])

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
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getAllOrders()
    }, [])

    const findOrders = () => {
        const result = orders.filter(order => order._id.includes(findField) || order.tableId?.number.includes(findField))
        return setShowOrders(result)
    }

    useEffect(() => {
        findOrders()
    }, [findField])

    const filterBy = (event) => {
        if (orderStatus === 'all') {
            return setShowOrders(orders)
        }
        const result = orders.filter((order) => order.status === orderStatus)
        return setShowOrders(result)
    }

    useEffect(() => {
        filterBy()
    }, [orderStatus])

    return (
        <>
            <Navbar />
            <Lottie className="lottieFile" options={defaultOptionsAnimation}
                height={"auto"}
                width={"150px"}
                isClickToPauseDisabled={true}
            />

            <div className="img-container">

                <Lottie className="lottieFile" options={defaultOptionsAnimationOrder}
                    height={"auto"}
                    width={"200px"}
                    isClickToPauseDisabled={true}
                />
                <Lottie className="lottieFile" options={defaultOptionsAnimationItem}
                    height={"auto"}
                    width={"100px"}
                    isClickToPauseDisabled={true}
                />
                <Lottie className="lottieFile" options={defaultOptionsAnimationTable}
                    height={"auto"}
                    width={"200px"}
                    isClickToPauseDisabled={true}
                />
            </div>
            <div className="btn-container">
                <a className="btn-item" href="/order/create">Create Order</a>
                <a className="btn-item" href="/item/create">Create Item</a>
                <a className="btn-item" href="/table/create">Create Table</a>
            </div>
            <div className="orders-container">
                <div className="search-container">
                    <SearchBar handlerOnChange={(e) => setFindField(e.target.value)} />
                    <FilterBy options={['paid', 'pending']} handlerOnchange={(e) => setOrderStatus(e.target.value)} />
                </div>
                {orders && <Orders orders={showOrders} />}
            </div>

        </>
    );
}