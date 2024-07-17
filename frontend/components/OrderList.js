import React from 'react'
import { useGetOrdersQuery } from '../state/pizzaApi'
import { useSelector, useDispatch } from 'react-redux'
import { setFilter } from '../state/filterSlice'

export default function OrderList() {
  const dispatch = useDispatch()
  const filter = useSelector((state) => state.filter)
  const { data: orders = [], error, isLoading } = useGetOrdersQuery()

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error fetching orders</div>

  const filteredOrders = filter === 'All' ? orders : orders.filter(order => order.size === filter)

  return (
    <div id="orderList">
      <h2>Pizza Orders</h2>
      <ol>
        {filteredOrders.map((order) => (
          <li key={order.id}>
            <div>
              {order.customer} ordered a size {order.size} pizza with {
                order.toppings && order.toppings.length > 0 ? `${order.toppings.length} topping${order.toppings.length > 1 ? 's' : ''}` : 'no toppings'
              }
            </div>
          </li>
        ))}
      </ol>
      <div id="sizeFilters">
        Filter by size:
        {['All', 'S', 'M', 'L'].map((size) => {
          const className = `button-filter${size === filter ? ' active' : ''}`
          return (
            <button
              data-testid={`filterBtn${size}`}
              className={className}
              key={size}
              onClick={() => dispatch(setFilter(size))}
            >
              {size}
            </button>
          )
        })}
      </div>
    </div>
  )
}





// export default function OrderList() {
//   const orders = []
//   return (
//     <div id="orderList">
//       <h2>Pizza Orders</h2>
//       <ol>
//         {
//           orders.map(() => {
//             return (
//               <li key={1}>
//                 <div>
//                   order details here
//                 </div>
//               </li>
//             )
//           })
//         }
//       </ol>
//       <div id="sizeFilters">
//         Filter by size:
//         {
//           ['All', 'S', 'M', 'L'].map(size => {
//             const className = `button-filter${size === 'All' ? ' active' : ''}`
//             return <button
//               data-testid={`filterBtn${size}`}
//               className={className}
//               key={size}>{size}</button>
//           })
//         }
//       </div>
//     </div>
//   )
// }
