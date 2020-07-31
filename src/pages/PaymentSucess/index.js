import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import api from "../../services/api";
import './style.css'
import Logo from '../../assets/Logo.svg'
import paymentSuccess from '../../assets/success.png'
import GeneratorPdf from '../GeneratorPdf'


export default function PaymentSuccess(props) {
    const history = useHistory()
    // const [token, setToken] = useState(localStorage.getItem('token'))
    const [orderId, setOrderId] = useState(props.match.params.id)
    const [order, setOrder] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        getItemsFromOrder()
    }, [])

    const getItemsFromOrder = async () => {
        try {
            const { data } = await api.get(`payment/order/${orderId}`);
            if (data?.hasOwnProperty('error')) {
                return setError(data.error)
            }
            setOrder(data)

            await api.put(`payment/update/${orderId}`);


        } catch (error) {
            console.log(error)
        }
    }
    return (<div class="payment-page-container">
        <img src={Logo} alt="rfp_logo" style={{ margin: "30px" }} />
        <div className="content">
            <h1 className="payment-success-title">PAYMENT SUCCESS</h1>
            {order && <div className="payment-sucess-details">
                <p className="payment-success-info">Date: <span className="order-date-success" >
                    {new Date(order.created_at).toLocaleDateString('de-DE', { hour: 'numeric', minute: 'numeric', second: 'numeric' })}
                </span></p>
                <p className="payment-success-info">You order number is {order._id}</p>
                <p className="payment-success-info">Paid {order.total.toFixed(2)}€ with card.</p>
            </div>}

            <img src={paymentSuccess} alt="success" />
            {order && <GeneratorPdf order={order} />}
        </div>
    </div>);
}