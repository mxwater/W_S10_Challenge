import React, { useState, useEffect } from 'react';
import PizzaForm from './PizzaForm';
import { useGetOrdersQuery, useAddOrderMutation } from '../state/pizzaApi';

function App() {
  const [filter, setFilter] = useState('All');
  const [orders, setOrders] = useState([]);
  const { data: ordersData, error, isLoading } = useGetOrdersQuery();
  const [addOrder] = useAddOrderMutation();

  useEffect(() => {
    if (ordersData) {
      setOrders(ordersData);
    }
  }, [ordersData]);

  const handleFilterChange = (size) => {
    setFilter(size);
  };

  const filteredOrders = filter === 'All' ? orders : orders.filter(order => order.size === filter);

  const handleAddOrder = async (newOrder) => {
    await addOrder(newOrder);
    setOrders((prevOrders) => [...prevOrders, newOrder]);
  };

  return (
    <div id="app">
      <PizzaForm addOrder={handleAddOrder} />
      <div id="orderList">
        <h2>Pizza Orders</h2>
        {isLoading && <div>Loading...</div>}
        {error && <div>Error fetching orders</div>}
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
        <div id="sizeFilters">
          <button className={`button-filter ${filter === 'All' ? 'active' : ''}`} data-testid="filterBtnAll" onClick={() => handleFilterChange('All')}>All</button>
          <button className={`button-filter ${filter === 'S' ? 'active' : ''}`} data-testid="filterBtnS" onClick={() => handleFilterChange('S')}>S</button>
          <button className={`button-filter ${filter === 'M' ? 'active' : ''}`} data-testid="filterBtnM" onClick={() => handleFilterChange('M')}>M</button>
          <button className={`button-filter ${filter === 'L' ? 'active' : ''}`} data-testid="filterBtnL" onClick={() => handleFilterChange('L')}>L</button>
        </div>
      </div>
    </div>
  );
}

export default App;



// import React, { useState, useEffect } from 'react';
// import PizzaForm from './PizzaForm';
// import OrderList from './OrderList';
// import { useGetOrdersQuery } from '../state/pizzaApi';

// function App() {
//   const [filter, setFilter] = useState('All');
//   const { data: ordersData = [], isLoading, error } = useGetOrdersQuery();

//   const handleFilterChange = (size) => {
//     setFilter(size);
//   };

//   return (
//     <div id="app">
//       <PizzaForm />
//       <div id="orderList">
//         <h2>Pizza Orders</h2>
//         <ol>
//           <OrderList orders={ordersData} filter={filter} />
//         </ol>
//         <div id="sizeFilters">
//           <p>Filter by size:</p>
//           <button className={`button-filter ${filter === 'All' ? 'active' : ''}`} data-testid="filterBtnAll" onClick={() => handleFilterChange('All')}>All</button>
//           <button className={`button-filter ${filter === 'S' ? 'active' : ''}`} data-testid="filterBtnS" onClick={() => handleFilterChange('S')}>S</button>
//           <button className={`button-filter ${filter === 'M' ? 'active' : ''}`} data-testid="filterBtnM" onClick={() => handleFilterChange('M')}>M</button>
//           <button className={`button-filter ${filter === 'L' ? 'active' : ''}`} data-testid="filterBtnL" onClick={() => handleFilterChange('L')}>L</button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;

