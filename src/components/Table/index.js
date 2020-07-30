import React from 'react'
import { Link } from 'react-router-dom'
import './style.css'

export default function index({ table, handleTableDelete}) {
    const { _id, number, status } = table

    return (
        <tr className="table-row" key={_id}>
            <td className='table-info table-number'>{number}</td>
            <td className='table-info order-total'>{status}</td>
            <td className='table-info'>
            <button className="btn-red" onClick={() => handleTableDelete(_id)}>Delete</button>
            </td>
        </tr>
    )
}