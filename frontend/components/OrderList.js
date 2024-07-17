import React from 'react';

const OrderList = ({ orders }) => {
  const renderToppings = (toppingIds) => {
    const toppingNames = toppingIds.map(id => {
      switch (id) {
        case '1':
          return 'Pepperoni';
        case '2':
          return 'Green Peppers';
        case '3':
          return 'Pineapple';
        case '4':
          return 'Mushrooms';
        case '5':
          return 'Ham';
        default:
          return '';
      }
    });
    return toppingNames.join(', ');
  };

  return (
    <ol>
      {orders.map((order) => (
        <li key={order.id}>
          {`${order.fullName} ordered a size ${order.size} with ${
            order.toppings.length > 0
              ? renderToppings(order.toppings)
              : 'no toppings'
          }`}
        </li>
      ))}
    </ol>
  );
};

export default OrderList;