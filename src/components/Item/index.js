import React from 'react'
import itemImg from '../../assets/undraw_cooking.svg'
import './style.css'

export default function index({ item, fnHandlerDelete, btnText }) {

    const { _id, name, price, number } = item

    return (
        <tr className="table-row">
            <td className='table-info item-number'>
                <span className='img-info'><img className='info-thumbnail' src={itemImg} alt="cooking" /> #{number}</span>
            </td>
            <td className='table-info item-name'>{name}</td>
            <td className='table-info item-total'>€{price.toFixed(2)}</td>
            <td className='table-info'>
                <button className={btnText === 'delete' ? `btn-red` : `btn-green`} onClick={() => fnHandlerDelete(_id)}>{btnText}</button>
            </td>
        </tr>
    )
}