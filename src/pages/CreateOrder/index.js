import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Lottie from 'react-lottie'
import Navbar from '../../components/Navbar'
import OrderEditCard from '../../components/OrderEditCard'
import SearchBar from '../../components/SearchBar'
import FilterBy from '../../components/FilterBy'
import Items from '../../components/Items'
import api from "../../services/api";


import listDataAnimation from '../../assets/lotties/27474-food-delivery.json'


import './style.css'

//config lottie file
const defaultOptionsAnimation = {
    loop: true,
    autoplay: true,
    animationData: listDataAnimation,

};


export default function CreateOrder(props) {
    const history = useHistory()
    const [token, setToken] = useState(localStorage.getItem('token'))
    const [items, setItems] = useState([])
    const [allItems, setAllItems] = useState([])
    const [orderId, setOrderId] = useState('')
    const [order, setOrder] = useState(null)
    const [checked, setChecked] = useState(false)
    const [error, setError] = useState(null)
    const [showItems, setShowItems] = useState([])
    const [tableNumber, setTableNumber] = useState('')
    const [itemCategory, setItemCategory] = useState('all')
    const [orders, setOrders] = useState([])
    const [allTableFree, setAllTableFree] = useState([])

    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    useEffect(() => {
        if (!token) {
            history.push('/login')
        }
    }, [token])

    useEffect(() => {
        setItems(items)
    }, [items])
    useEffect(() => {
        setShowItems(allItems)
    }, [allItems])

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

    const getAllFreeTables = async () => {
        const { data } = await api.get('/tables', config)
        // const tablesIds = data.map(({ _id }) => _id)
        const tablesFree = [...new Set(orders.filter(order => order.status !== 'pending').map(order => order.tableId))]
        console.log(tablesFree)
        setAllTableFree(data.filter(table => tablesFree.includes(table._id)))

    }

    const getItemsFromOrder = async () => {
        if (!orderId) {
            const newOrder = {
                "status": "pending"
            }
            // const result = await api.post(`order/create`, newOrder, config);
            // setOrderId(result.data._id)
            // const { data } = await api.get(`/order/${result.data._id}`, config);
            // if (data?.hasOwnProperty('error')) {
            //     return setError(data.error)
            // }
            // setOrder(data)
            // if (data.status === 'paid') {
            //     setChecked(true)
            // }
            // history.push(`/order/${result.data._id}`)

        }
    }
    const updateOrder = async (itemId) => {
        try {
            const { data } = await api.get('/tables', config)
            console.log(data)

            // const result = await api.put(`/order/update/${orderId}`, config);
            // getItemsFromOrder()

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getAllOrders()
        getItemsFromOrder()
    }, [])

    useEffect(() => {
        getAllFreeTables()
    }, [orders])
    useEffect(() => {
        console.log(allTableFree)
    }, [allTableFree])



    const handleChange = e => {
        setTableNumber(e.target.value);
    };

    return null

}