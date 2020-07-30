import React from 'react'
import Toggle from '../Toggle'
import { Link } from 'react-router-dom'
import './style.css'

export default function index({ order }) {
    const { _id, tableId, created_at, subtotal, vat, total, status } = order
    const lastTenDigitsOfId = _id.slice(-10)
    return (

        <div className="order-details-card">
            <p className="order-description">Status:  <span className={status === 'paid' ? `status-paid-card-checkout` : 'status-pending-card-checkout'}>{status === 'paid' ? `PAID` : 'PENDING'}</span>
            </p>
            <div className="order-details-body">
                <div className="order-column-left">
                    <p className="order-description">Order-ID:<span className="order-description-value">{lastTenDigitsOfId}</span></p>
                    <p className="order-description">Created:
                    <span className="order-date" >
                            {new Date(created_at).toLocaleDateString('de-DE', { hour: 'numeric', minute: 'numeric', second: 'numeric' })}
                        </span>
                    </p>
                    <p className="order-description">Subtotal:<span className="order-description-value">€{subtotal.toFixed(2)}</span></p>
                    <p className="order-description">VAT:<span className="order-description-value">€{vat.toFixed(2)}</span></p>
                    <p className="order-description order-total">TOTAL:<span className="order-description-value order-total">€{total.toFixed(2)}</span></p>
                </div>
                <div className="order-column-right">
                    <p className="order-description">Table NR:</p>
                    <span className="order-table-number">{tableId?.number}</span>
                </div>
            </div>
        </div>
    )
}