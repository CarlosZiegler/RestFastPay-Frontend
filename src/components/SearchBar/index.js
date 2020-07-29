import React from 'react'
import './style.css'

export default function index({ handlerOnChange }) {
    return (
        <div className="search-bar">
            <input type="text" className="search-bar-input" onChange={handlerOnChange} placeholder="Search by Order or Table" />
        </div>
    )
}