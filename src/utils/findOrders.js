const findOrders = (orders, target,fnCallback) => {
    const result = orders.filter(order => order._id.includes(target) || order.tableId?.number == (target))
    return fnCallback(result)
}

export default findOrders