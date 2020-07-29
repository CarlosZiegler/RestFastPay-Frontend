import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Lottie from 'react-lottie'
import Navbar from '../../components/Navbar'
import Items from '../../components/Items'
import api from "../../services/api";


import listDataAnimation from '../../assets/lotties/18869-menu-loading.json'


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
    const [orderId, setOrderId] = useState(props.match.params.id)
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
            setItems(data.itemsId)
        } catch (error) {
            console.log(error)
        }
    }

    const deleteItem = async (itemId) => {
        try {

            const updateOrderItems = items.filter(item => item._id !== itemId)?.map(({ _id }) => _id)
            const data = { itemsId: updateOrderItems }
            const result = await api.put(`/order/update/${orderId}`, data, config);
            console.log(updateOrderItems)
            getItemsFromOrder()

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getItemsFromOrder()
    }, [])


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
            <div className="items-container">
                {items && <Items items={items} fnHandlerDelete={deleteItem} />}
            </div>

        </>
    );
}