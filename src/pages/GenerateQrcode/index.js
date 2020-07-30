import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import Lottie from 'react-lottie'
import Navbar from '../../components/Navbar';
import QRCode from 'qrcode.react'
import listDataAnimation from '../../assets/lotties/8493-qr-code-scan.json'
import './style.css'

//config lottie file
const defaultOptionsAnimation = {
    loop: true,
    autoplay: true,
    animationData: listDataAnimation,

};

export default function Qrcode(props) {

    const [orderId, setOrderId] = useState(props.match.params.id)

    const history = useHistory()



    return (<>
        <Navbar />
        <div className="container">
            <div className="img-container">
                < Lottie className="lottieFile" options={defaultOptionsAnimation}
                    height={"auto"}
                    width={"100px"}
                    isClickToPauseDisabled={true}
                />
            </div>
            <div className="img-container">
                <QRCode size={300} className="Qrcode" value={`https://restfastpay-lase53lfa.vercel.app/checkout/order/${orderId}`} />
            </div>
            <div className="back-button">
                <Link className="btn-back" to={`/main`}> ← Orders Overview</Link>
            </div>
        </div>
    </>);
}