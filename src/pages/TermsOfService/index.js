import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import api from "../../services/api";
import Terms from "../../assets/termsofservice.png";
import { Link } from 'react-router-dom'

import './style.css'

export default function TermsOfService() {
    return (<>
        <div className="content">
            <img style={{width: "380px"}} src={Terms} alt="login" />
            <br />
            <Link to={'/payment-method'}>Back</Link>
        </div>
    </>);
}