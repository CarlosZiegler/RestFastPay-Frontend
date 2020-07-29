import React from 'react'
import { Link } from 'react-router-dom'
import './style.css'

export default function index({ order }) {
    const { _id, tableId, subtotal, vat, total, status } = order
    const lastFiveDigitsOfId = _id.slice(-5)

    return (
        <tr className="table-row">
            <td className='table-info order-number'>{lastFiveDigitsOfId}</td>
            <td className='table-info table-number'>{tableId?.number}</td>
            <td className="table-info order-status"><span className={status === 'paid' ? `status-paid` : 'status-pending'}>{status}</span></td>
            <td className='table-info order-total'>€{total.toFixed(2)}</td>
            <td className='table-info'>
                <Link className="btn-orange" to={`/order/${_id}`}>Details</Link>
            </td>
        </tr>
    )
}