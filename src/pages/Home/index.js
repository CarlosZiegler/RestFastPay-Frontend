import React from "react";
import Navbar from '../../components/Navbar'
import mainGraphics from '../../assets/main-graphics.png'
import './style.css'
import { Link } from 'react-router-dom'


export default function Home() {

    return (<>
        <Navbar />
        <div className="content">
            <img className='img-big' src={mainGraphics} alt='main' />
            <h1 className="text-coral">Say Hi to your new payment process</h1>
            <p className="text-gray no-margin">Less contact, more efficiency. <br/>fastPay is the ideal payment choice during pandemic times</p>
            <br/>
            <Link className="btn-coral btn-getstarted" to={`/signup`}>Get started</Link>
        </div>
    </>);
}