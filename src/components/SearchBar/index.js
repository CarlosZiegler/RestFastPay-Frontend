import React from 'react'
import './style.css'

export default function index({ handlerOnChange }) {
    return (
        <div className="search-bar">
            <h2 className="search-bar-title">Search</h2>
            <input type="text" className="search-bar-input" onChange={handlerOnChange} />
        </div>
    )
}