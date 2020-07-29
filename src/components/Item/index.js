import React from 'react'
import './style.css'

export default function index({ item, fnHandlerDelete }) {

    const { _id, name, price, number } = item

    return (
        <tr className="table-row">
            <td className='table-info item-number'>#{number}</td>
            <td className='table-info item-name'>{name}</td>
            <td className='table-info item-total'>€{price.toFixed(2)}</td>
            <td className='table-info'>
                <button className="btn-red" onClick={() => fnHandlerDelete(_id)}>Delete</button>
            </td>
        </tr>
    )
}