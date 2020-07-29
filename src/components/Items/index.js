import React from 'react'
import Item from '../Item'
import api from "../../services/api";
import './style.css'

export default function index({ items, fnHandlerDelete, btnText }) {



    return (
        <table className="orders-table">
            <thead>
                <tr className="orders-table-header" >
                    <th>Item-nr</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {items && items.map((item) =>
                    <Item key={item._id} item={item} btnText={btnText} fnHandlerDelete={fnHandlerDelete} />
                )}
            </tbody>
        </table>
    )
}