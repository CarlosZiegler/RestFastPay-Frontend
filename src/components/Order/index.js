import React from 'react'
import './style.css'

export default function index({ order }) {
    const { _id, tableId, subtotal, vat, total, status } = order
    const orderIdSmall = _id.slice(0, 5)

    return (
        <tr className="table-row">
            <td className='table-info order-number'>#{orderIdSmall}</td>
            <td className='table-info table-number'>{tableId?.number}</td>
            <td className="table-info order-status"><span className="status-paid">{status}</span></td>
            <td className='table-info order-total'>{total.toFixed(2)}</td>
            <td className='table-info'>
                <button className="btn-orange">Details</button>
            </td>
        </tr>
    )
}