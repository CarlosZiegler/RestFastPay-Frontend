import React from 'react'
import './style.css'

export default function index({ order }) {
    const { _id, tableId, subtotal, vat, total, status } = order
    const lastFiveDigitsOfId = _id.slice(-5)
    let showStatus = 'PENDING';
    if (status === 'closed') {
        showStatus = 'PAID';
    }


    return (
        <tr className="table-row">
            <td className='table-info order-number'>{lastFiveDigitsOfId}</td>
            <td className='table-info table-number'>{tableId?.number}</td>
            <td className="table-info order-status"><span className={status === 'closed' ? `status-paid` : 'status-pending'}>{showStatus}</span></td>
            <td className='table-info order-total'>€{total.toFixed(2)}</td>
            <td className='table-info'>
                <button className="btn-orange">Details</button>
            </td>
        </tr>
    )
}