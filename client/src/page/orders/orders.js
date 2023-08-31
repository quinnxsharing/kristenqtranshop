import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./orders.css";
import baseUrl from '../../baseUrl';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch orders from an API
    // modify later depend on the user session 
    axios.get(`${baseUrl}/orders?user_id=1`)
      .then((response) => {
        setOrders(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching orders:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="orders-container">
      <h1 className="orders-header">Your Orders</h1>
      <ul className="orders-list">
        {orders.map((order) => (
          <li key={order.id} className="order">
            <strong className="order-label">Order ID:</strong> {order.id}<br />
            <strong className="order-label">Order Date:</strong> {order.order_date}<br />
            <strong className="order-label">Order Status:</strong> {order.order_status}<br />
            <strong className="order-label">Order Total:</strong> ${order.order_total}<br />
            <strong className="order-label">Order Items:</strong>
            <ul className="order-items-list">
              {order.order_items.map((item) => (
                <li key={item.product_id} className="order-item">
                  <strong className="order-label">Product:</strong> {item.product_id}<br />
                  <strong className="order-label">Quantity:</strong> {item.quantity}<br />
                  <strong className="order-label">Price:</strong> ${item.price}<br />
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Orders;
