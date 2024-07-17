import React from 'react'
import { useGetOrdersQuery } from '../state/pizzaApi'

export default function OrderList({ orders, filter }) {
  const filteredOrders = filter === 'All' ? orders : orders.filter(order => order.size === filter)

  return (
    <div id="orderList">
      <h2>Pizza Orders</h2>
      <ol>
        {filteredOrders.map((order, index) => (
          <li key={index}>
            {order.customer} ordered a size {order.size} pizza with {
              order.toppings && order.toppings.length > 0
                ? `${order.toppings.length} topping${order.toppings.length > 1 ? 's' : ''}`
                : 'no toppings'
            }
          </li>
        ))}
      </ol>
    </div>
  )
}