import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Lottie from 'react-lottie'
import Navbar from '../../components/Navbar'
import OrderEditCard from '../../components/OrderEditCard'
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


export default function OrderDetails(props) {
    const history = useHistory()
    const [token, setToken] = useState(localStorage.getItem('token'))
    const [items, setItems] = useState([])
    const [allItems, setAllItems] = useState([])
    const [orderId, setOrderId] = useState(props.match.params.id)
    const [order, setOrder] = useState(null)
    const [checked, setChecked] = useState(false)
    const [error, setError] = useState(null)


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

    const getItemsFromOrder = async () => {
        try {
            const { data } = await api.get(`/order/${orderId}`, config);
            if (data?.hasOwnProperty('error')) {
                return setError(data.error)
            }
            setOrder(data)
            setItems(data.itemsId)
            if (data.status === 'paid') {
                setChecked(true)
            }

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
            setAllItems(data)

        } catch (error) {
            console.log(error)
        }
    }

    const deleteItem = async (itemId) => {
        try {
            const itemIndex = items.findIndex(item => item._id === itemId)
            const updateOrderItems = items.filter((item, index) => index !== itemIndex)?.map(({ _id }) => _id)
            const data = { itemsId: updateOrderItems }
            const result = await api.put(`/order/update/${orderId}`, data, config);
            getItemsFromOrder()

        } catch (error) {
            console.log(error)
        }
    }
    const addItem = async (itemId) => {
        try {
            const updateOrderItems = [...items.map(({ _id }) => _id), itemId]
            const data = { itemsId: updateOrderItems }
            const result = await api.put(`/order/update/${orderId}`, data, config);
            getItemsFromOrder()

        } catch (error) {
            console.log(error)
        }
    }
    const updateStatus = async (itemId) => {
        try {
            let data
            if (checked) {
                data = { status: 'paid' }
            } else {
                data = { status: 'pending' }
            }
            const result = await api.put(`/order/update/${orderId}`, data, config);
            getItemsFromOrder()

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getItemsFromOrder()
        getAllItemsFromAPI()
    }, [])

    useEffect(() => {
        updateStatus()
    }, [checked])



    const handleChange = e => {
        setChecked(e.target.checked);
    };


    return (
        <>
            <Navbar />
            <div className="lottie-container-details">
                <Lottie className="lottieFile" options={defaultOptionsAnimation}
                    height={"auto"}
                    width={"100px"}
                    isClickToPauseDisabled={true}
                />
            </div>
            {order && <OrderEditCard order={order} isChecked={checked} handleChange={handleChange} />}
            <div className="my-items-container">
                {items && <Items items={items} btnText='delete' fnHandlerDelete={deleteItem} />}
            </div>
            <div className="items-container">
                {allItems && <Items items={allItems} btnText={'add'} fnHandlerDelete={addItem} />}
            </div>
        </>
    );
}