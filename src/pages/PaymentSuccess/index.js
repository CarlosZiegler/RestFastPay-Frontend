import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Logo from '../../assets/Logo.svg'
import api from "../../services/api";
import paymentSuccess from '../../assets/success.png'

import './style.css'

export default function index({handleChange, isChecked}) {
    // const history = useHistory()
    // const [token, setToken] = useState(localStorage.getItem('token'))

    return (<>
        <img src={Logo} alt="rfp_logo" style={{margin: "30px"}}/>
        <div className="content">
        <h1>PAYMENT SUCCESS</h1>
        <p>Paid xx,xx€ with card.</p>
        <img src={paymentSuccess} alt="success"/>
        <button className="btn-green btn-pay">GET RECEIPT</button>
        </div>
    </>);
}