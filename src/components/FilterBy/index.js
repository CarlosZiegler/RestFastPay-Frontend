import React from 'react';
import './style.css'

export default function index({ options, handlerOnchange, title }) {

    return (
        <select name="filterBy" className="filterBy" id="filterBy" onChange={handlerOnchange} >
            <option value='all'>{title}</option>
            {options && options.map((option, index) => <option key={index} value={option} >{option}</option>)}
        </select>
    )
}