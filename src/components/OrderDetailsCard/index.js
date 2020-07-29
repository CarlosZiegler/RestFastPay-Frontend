import React from 'react'
import Toogle from '../Toogle'
import { Link } from 'react-router-dom'
import './style.css'

export default function index({ order }) {
    const { _id, tableId, created_at, subtotal, vat, total, status } = order
    const lastFiveDigitsOfId = _id.slice(-5)

    return (

        <div className="order-details-card">
            <div className="order-status">
                <Toogle />
                <p><span className={status === 'paid' ? `status-paid` : 'status-pending'}>{status}</span></p>
            </div>
            <div className="order-details-body">
                <div className="order-column-left">
                    <p>Order-ID:{lastFiveDigitsOfId}</p>
                    <p>Created:{new Date(created_at).toLocaleDateString('de-DE', { hour: 'numeric', minute: 'numeric', second: 'numeric' })}</p>
                    <p>Subtotal:€{subtotal.toFixed(2)}</p>
                    <p>VAT:€{vat.toFixed(2)}</p>
                    <p>TOTAL:€{total.toFixed(2)}</p>
                </div>
                <div className="order-column-right">
                    <p>Table NR</p>
                    <p>{tableId?.number}</p>
                    <Link className="btn-orange" to={`/order/${_id}`}>ADD ITEM</Link>
                </div>
            </div>
        </div>
    )
}