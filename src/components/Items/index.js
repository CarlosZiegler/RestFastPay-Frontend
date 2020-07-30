import React from 'react'
import Item from '../Item'
import { v4 as uuidv4 } from 'uuid';
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
                    <Item key={uuidv4()} item={item} btnText={btnText} fnHandlerDelete={fnHandlerDelete} />
                )}
            </tbody>
        </table>
    )
}