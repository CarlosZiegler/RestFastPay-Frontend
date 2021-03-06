import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import api from "../../services/api";
import './style.css'
import Logo from '../../assets/Logo.svg'
import Visa from '../../assets/visa.png'
import MasterCard from '../../assets/mastercard.png'
import Maestro from '../../assets/maestro.png'
import Amazon from '../../assets/amazon.png'
import PayPal from '../../assets/PayPal.png'
import paymentImg from '../../assets/payment-graphics.png'


export default function PaymentMethod(props) {
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
            if (data.status === 'paid') {
                history.push('/')
            }


        } catch (error) {
            console.log(error)
        }
    }
    return (<>
        <img src={Logo} alt="rfp_logo" style={{ margin: "30px 0px 0px 30px" }} />
        <div className="content">
            <img className="payment-img" src={paymentImg} alt="payment" />
            <div className='payment-options text-gray'>
                <form>
                    {/* <fieldset className="payment-options text-gray"> */}
                    <legend>CHOOSE PAYMENT METHOD</legend>
                    <br />
                    <div className='payment-method'>
                        <input type="radio" name="payment" value="visa" />
                        <label for="visa"><img className="card-img" src={Visa} alt="visa" /></label>
                    Pay with Visa
                </div>

                    <div className='payment-method'>
                        <input type="radio" name="payment" value="mastercard" />
                        <label for="mastercard"><img className="card-img" src={MasterCard} alt="mastercard" /></label>
                    Pay with MasterCard
                </div>

                    <div className='payment-method'>
                        <input type="radio" name="payment" value="maestro" />
                        <label for="maestro"><img className="card-img" src={Maestro} alt="maestro" /></label>
                    Pay with Maestro
                </div>

                    <div className='payment-method'>
                        <input type="radio" name="payment" value="amazon" />
                        <label for="amazon"><img className="card-img" src={Amazon} alt="amazon" /></label>
                    Use Amazon Pay
                </div>

                    <div className='payment-method'>
                        <input type="radio" name="payment" value="paypal" />
                        <label for="paypal"><img className="card-img" src={PayPal} alt="paypal" /></label>
                    Use PayPal
                </div>
                    <div className='terms-of-service'>
                        <input type="checkbox" name="consent" value="agree" />
                        <label for="consent">I agree to <a href="/terms-of-service">terms of service</a></label>
                    </div>
                </form>
                <Link className="btn-green btn-pay " to={`/checkout/paid/success/${orderId}`}>PAY</Link>
            </div>
        </div>
    </>);
}