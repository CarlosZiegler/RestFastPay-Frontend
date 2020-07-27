import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom'

export default function Main() {
    const history = useHistory()
    const token = localStorage.getItem('token')

    return (
        <div className="container">
            <h1>Test Main</h1>
            <h1>Token: {token}</h1>
        </div>
    );
}