import React from 'react'
import './style.css'

export default function index({ item, fnHandlerDelete, btnText }) {

    const { _id, name, price, number } = item

    return (
        <tr className="table-row">
            <td className='table-info item-number'>#{number}</td>
            <td className='table-info item-name'>{name}</td>
            <td className='table-info item-total'>€{price.toFixed(2)}</td>
            <td className='table-info'>
                <button className={btnText === 'delete' ? `btn-red` : `btn-green`} onClick={() => fnHandlerDelete(_id)}>{btnText}</button>
            </td>
        </tr>
    )
}