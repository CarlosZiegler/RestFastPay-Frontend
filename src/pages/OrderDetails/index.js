import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Lottie from 'react-lottie'
import Navbar from '../../components/Navbar'
import OrderDetailsCard from '../../components/OrderDetailsCard'
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
        getItemsFromOrder()
    }, [])

    useEffect(() => {
        updateStatus()
    }, [checked])

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
            console.log('status from DB', data.status)
            if (data.status === 'paid') {
                setChecked(true)
            }

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
            await getItemsFromOrder()

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





    const handleChange = e => {
        setChecked(e.target.checked);
    };

    useEffect(() => {
        console.log('render checked', checked)
    }, [checked])


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
            <div className="back-button">
                <Link className="btn-back" to={`/main`}> ← Orders Overview</Link>

            </div>
            {order && <OrderDetailsCard order={order} isChecked={checked} handleChange={handleChange} />}
            <div className="items-container">
                {items && <Items items={items} fnHandlerDelete={deleteItem} btnText={'delete'} />}
            </div>
        </>
    );
}