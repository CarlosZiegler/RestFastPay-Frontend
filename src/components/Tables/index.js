import React from 'react'
import Table from '../Table'
import './style.css'

export default function index({ tables, handleTableDelete}) {
    return (
        <table className="orders-table">
            <thead>
                <tr className="orders-table-header" >
                    <th>Number</th>
                    <th>Status</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {tables && tables.map((table) =>
                    <Table key={table._id} table={table} handleTableDelete={handleTableDelete} />
                )}
            </tbody>
        </table>
    )
}