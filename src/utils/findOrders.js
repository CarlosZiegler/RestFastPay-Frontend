const findOrders = (orders, target) => {
    return orders.filter(order => order._id.includes(target) || order.tableId?.number == (target))
}

export default findOrders