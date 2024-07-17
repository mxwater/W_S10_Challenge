import React, { useState, useEffect } from 'react';
import PizzaForm from './PizzaForm';
import OrderList from './OrderList';
import { useGetOrdersQuery } from '../state/pizzaApi';

function App() {
  const [filter, setFilter] = useState('All');
  const [orders, setOrders] = useState([]);
  const { data: ordersData } = useGetOrdersQuery();

  useEffect(() => {
    if (ordersData) {
      setOrders(ordersData);
    }
  }, [ordersData]);

  const handleFilterChange = (size) => {
    setFilter(size);
  };

  return (
    <div id="app">
      <PizzaForm setOrders={setOrders} />
      <div id="orderList">
        <h2>Pizza Orders</h2>
        <ol>
          <OrderList orders={orders} filter={filter} />
        </ol>
        <div id="sizeFilters">
          <button className="button-filter active" data-testid="filterBtnAll" onClick={() => handleFilterChange('All')}>All</button>
          <button className="button-filter" data-testid="filterBtnS" onClick={() => handleFilterChange('S')}>S</button>
          <button className="button-filter" data-testid="filterBtnM" onClick={() => handleFilterChange('M')}>M</button>
          <button className="button-filter" data-testid="filterBtnL" onClick={() => handleFilterChange('L')}>L</button>
        </div>
      </div>
    </div>
  );
}

export default App;
