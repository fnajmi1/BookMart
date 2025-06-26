import React, { useEffect, useState } from "react";
import "../styles/Order.css";
import emptyOrderImage from "../assets/emptycart.png";
import { useNavigate } from "react-router-dom";

interface EBookItem {
  id: number;
  name: string;
  author: string;
  category: string;
  image: string;
  price: number;
  quantity: number;
}

interface Order {
  id: string;
  date: string;
  status: "Processing" | "Download Ready" | "Completed" | "Cancelled";
  total: number;
  items: EBookItem[];
}

const OrderPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Your Orders";
    const storedOrders = localStorage.getItem("orders");
    if (storedOrders) {
      setOrders(JSON.parse(storedOrders));
    }
  }, []);

  const toggleOrder = (orderId: string) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const getStatusClass = (status: Order["status"]) => {
    switch (status) {
      case "Processing":
        return "status-badge status-processing";
      case "Download Ready":
        return "status-badge status-ready";
      case "Completed":
        return "status-badge status-completed";
      case "Cancelled":
        return "status-badge status-cancelled";
      default:
        return "status-badge";
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="orders-page">
      <div className="orders-container">
        <div className="orders-header">
          <h1>Your Orders</h1>
          <p>View and manage your purchases</p>
        </div>

        {orders.length === 0 ? (
          <div className="orders-header">
            <img src={emptyOrderImage} alt="No Orders" className="empty-order-image" />
            <h3>No orders yet</h3>
            <p>Your placed orders will appear here</p>
          </div>
        ) : (
          orders.map((order) => (
            <div key={order.id} className="order-card">
              <div className="order-header" onClick={() => toggleOrder(order.id)}>
                <div className="order-top">
                  <h3>Order {order.id}</h3>
                  <p>Placed on {formatDate(order.date)}</p>
                </div>
                <div className="order-status">
                  <span className={getStatusClass(order.status)}>{order.status}</span>
                  <span className="order-total">₹{order.total.toFixed(2)}</span>
                </div>
              </div>

              {expandedOrder === order.id && (
                <div className="order-items">
                  <h4>Items in this order</h4>
                  {order.items.map((item) => (
                    <div key={item.id} className="item">
                      <img src={item.image} alt={item.name} />
                      <div className="item-details">
                        <h5>{item.name}</h5>
                        <p>by {item.author}</p>
                        <div className="item-meta">
                          <span>{item.category}</span>
                          <span>
                            ₹{(item.price * item.quantity).toFixed(2)} ({item.quantity}x)
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
             </div>
          ))
        )}
      </div>
       <div className="back-to-home">
  <button onClick={() => navigate("/home")} className="home-button">
    🏠 Back to Home
  </button>
</div>
    </div>
  );
};

export default OrderPage;
