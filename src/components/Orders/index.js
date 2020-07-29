import React from 'react'
import Order from '../Order'
import './style.css'

export default function index({ orders }) {
    return (
        <table className="orders-table">
            <thead>
                <tr className="orders-table-header" >
                    <th>Order</th>
                    <th>Table</th>
                    <th>Status</th>
                    <th>Total</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {orders && orders.map((order) =>
                    <Order key={order._id} order={order} />
                )}
            </tbody>
        </table>
    )
}