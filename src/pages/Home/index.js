import React from "react";
import Navbar from '../../components/Navbar'
import mainGraphics from '../../assets/main-graphics.png'
import './style.css'


export default function Home() {

    return (<>
        <Navbar />
        <div className="container">
            <img className='img-big' src={mainGraphics} alt='main' />
            <div className="main-text">
            <h1 className="say-hi">Say Hi to your new payment process</h1>
            <p className="gray-mid">Less contact, more efficiency - fastPay is the ideal payment choice during pandemic times</p>
            </div>
            <div className="getstarted-btn">
                <a className="btn-link" href="/signup">GET STARTED</a>
            </div>
        </div>
    </>);
}