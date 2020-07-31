import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import Lottie from 'react-lottie'
import Navbar from '../../components/Navbar'
import OrderEditCard from '../../components/OrderEditCard'
import SearchBar from '../../components/SearchBar'
import FilterBy from '../../components/FilterBy'
import Items from '../../components/Items'
import api from "../../services/api";


import listDataAnimation from '../../assets/lotties/27474-food-delivery.json'


import './style.css'

//config lottie file
const defaultOptionsAnimation = {
    loop: true,
    autoplay: true,
    animationData: listDataAnimation,

};


export default function EditOrder(props) {
    const history = useHistory()
    const [token, setToken] = useState(localStorage.getItem('token'))
    const [items, setItems] = useState([])
    const [allItems, setAllItems] = useState([])
    const [orderId, setOrderId] = useState(props.match.params.id)
    const [order, setOrder] = useState(null)
    const [checked, setChecked] = useState(false)
    const [error, setError] = useState(null)
    const [showItems, setShowItems] = useState([])
    const [findField, setFindField] = useState('')
    const [itemCategory, setItemCategory] = useState('all')
    const [allTableFree, setAllTableFree] = useState([])
    const [selectedTable, setSelectedTable] = useState('')


    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    useEffect(() => {
        if (!token) {
            history.push('/login')
        }
    }, [token])

    useEffect(() => {
        setItems(items)
    }, [items])

    useEffect(() => {
        setShowItems(allItems)
    }, [allItems])

    useEffect(() => {
        getItemsFromOrder()
        getAllItemsFromAPI()
    }, [])

    useEffect(() => {
        updateStatus()
    }, [checked])

    useEffect(() => {
        findOrders()
    }, [findField])

    useEffect(() => {
        getAllFreeTables()
    }, [order])

    useEffect(() => {
        filterBy()
    }, [itemCategory])

    useEffect(() => {
        updateTable()
    }, [selectedTable])


    const getItemsFromOrder = async () => {
        try {
            const { data } = await api.get(`/order/${orderId}`, config);
            if (data?.hasOwnProperty('error')) {
                return setError(data.error)
            }
            setOrder(data)
            setItems(data.itemsId)
            if (data.status === 'paid') {
                setChecked(true)
            }

        } catch (error) {
            console.log(error)
        }
    }
    const getAllFreeTables = async () => {
        const { data } = await api.get('/tables', config)
        setAllTableFree(data.filter(table => table.status === 'free'))
    }

    const getAllItemsFromAPI = async () => {
        try {
            const { data } = await api.get(`/items`, config);
            if (data?.hasOwnProperty('error')) {
                return setError(data.error)
            }
            setAllItems(data)


        } catch (error) {
            console.log(error)
        }
    }

    const deleteItem = async (itemId) => {
        try {
            const itemIndex = items.findIndex(item => item._id === itemId)
            const updateOrderItems = items.filter((item, index) => index !== itemIndex)?.map(({ _id }) => _id)
            const data = { itemsId: updateOrderItems }
            await api.put(`/order/update/${orderId}`, data, config);
            getItemsFromOrder()

        } catch (error) {
            console.log(error)
        }
    }

    const addItem = async (itemId) => {
        try {
            const updateOrderItems = [...items.map(({ _id }) => _id), itemId]
            const data = { itemsId: updateOrderItems }
            await api.put(`/order/update/${orderId}`, data, config);
            getItemsFromOrder()

        } catch (error) {
            console.log(error)
        }
    }

    const updateStatus = async (itemId) => {
        try {
            let data
            if (checked) {
                data = { status: 'paid' }
            } else {
                data = { status: 'pending' }
            }
            await api.put(`/order/update/${orderId}`, data, config);
            getItemsFromOrder()

        } catch (error) {
            console.log(error)
        }
    }
    const updateTable = async () => {
        if (order === null) {
            return
        }
        try {
            await api.put(`/order/update/${orderId}`, { tableId: selectedTable }, config);
            await api.put(`/table/update/${selectedTable}`, { status: 'occupied' }, config);
            getItemsFromOrder()

        } catch (error) {
            console.log(error)
        }
    }

    const handleChangeTable = e => {
        setSelectedTable(e.target.value);
    };

    const findOrders = () => {
        const result = allItems.filter(item => item.name.toLowerCase().includes(findField.toLowerCase()) || item.number == findField)
        return setShowItems(result)
    }

    const filterBy = (event) => {
        if (itemCategory === 'all') {
            return setShowItems(allItems)
        }
        const result = allItems.filter((item) => item.category === itemCategory)
        return setShowItems(result)
    }

    return (
        <>
            <Navbar />
            <div className="lottie-container-details">
                <Lottie className="lottieFile" options={defaultOptionsAnimation}
                    height={"auto"}
                    width={"200px"}
                    isClickToPauseDisabled={true}
                />
            </div>
            <div className="back-button">
                <Link className="btn-back" to={`/main`}> ← Orders Overview</Link>

            </div>
            {order && <OrderEditCard order={order} isChecked={checked} handlerOnchange={handleChangeTable} options={allTableFree} />}
            <div className="my-items-container">
                {items && <Items items={items} btnText='delete' fnHandlerDelete={deleteItem} />}
            </div>
            <div className="items-container">
                <div className="searchbar-items">
                    <h3>ADD TO ORDER</h3>
                    <div className="search-container">
                        <FilterBy title={'All'} options={['food', 'drink']} handlerOnchange={(e) => setItemCategory(e.target.value)} />
                        <SearchBar handlerOnChange={(e) => setFindField(e.target.value)} />
                    </div>
                </div>
                {showItems && <Items items={showItems} btnText={'add'} fnHandlerDelete={addItem} />}
            </div>
        </>
    );
}