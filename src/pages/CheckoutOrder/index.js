import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Lottie from 'react-lottie'
import OrderDetailsCheckout from '../../components/OrderDetailsCheckout'
import Items from '../../components/Items'
import api from "../../services/api";

import Logo from '../../assets/Logo.svg'

import listDataAnimation from '../../assets/lotties/23730-3d-mobile-payment.json'


import './style.css'

//config lottie file
const defaultOptionsAnimation = {
    loop: true,
    autoplay: true,
    animationData: listDataAnimation,

};


export default function CheckoutOrder(props) {
    const history = useHistory()
    const [token, setToken] = useState(localStorage.getItem('token'))
    const [items, setItems] = useState([])
    const [orderId, setOrderId] = useState(props.match.params.id)
    const [order, setOrder] = useState(null)
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
        getItemsFromOrder()
    }, [])



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


        } catch (error) {
            console.log(error)
        }
    }





    return (
        <>
            <div className="navbar">
                <a href="/">
                    <img className="navbar-img" src={Logo} alt="Logo" />
                </a>
            </div>
            <div className="lottie-container-checkout">
                <Lottie className="lottieFile" options={defaultOptionsAnimation}
                    height={"auto"}
                    width={"250px"}
                    isClickToPauseDisabled={true}
                />
            </div>
            {order && <OrderDetailsCheckout order={order} />}

            <div className="items-container">
                {items && <Items items={items} />}
            </div>
        </>
    );
}