import { useEffect, useState } from "react";
import "../styles/Cart.css";
import { useNavigate } from "react-router-dom";
import emptyCartImage from "../assets/emptycart.png";

interface Book {
  id: number;
  name: string;
  author: string;
  category: string;
  image: string;
  price: number;
}

interface CartItem extends Book {
  quantity: number;
}

interface OrderData {
  id: string;
  date: string;
  status: 'Processing' | 'Download Ready' | 'Completed' | 'Cancelled';
  total: number;
  items: CartItem[];
}

export default function Cart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      const parsedCart: CartItem[] = JSON.parse(storedCart);
      setCartItems(parsedCart);
    }
  }, []);

  const updateCart = (updatedCart: CartItem[]) => {
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const incrementQuantity = (id: number) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    updateCart(updatedCart);
  };

  const decrementQuantity = (id: number) => {
    const updatedCart = cartItems
      .map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(0, item.quantity - 1) }
          : item
      )
      .filter((item) => item.quantity > 0);
    updateCart(updatedCart);
  };

  const removeFromCart = (id: number) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    updateCart(updatedCart);
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const placeOrder = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    const newOrder: OrderData = {
      id: `#EBOOK-${Math.floor(Math.random() * 90000) + 10000}`,
      date: new Date().toISOString(),
      status: 'Processing',
      total: calculateTotal(),
      items: [...cartItems]
    };

    const existingOrders = localStorage.getItem("orders");
    const orders = existingOrders ? JSON.parse(existingOrders) : [];

    const updatedOrders = [...orders, newOrder];
    localStorage.setItem("orders", JSON.stringify(updatedOrders));

    localStorage.removeItem("cart");
    setCartItems([]);

    navigate("/orders");
  };

  if (cartItems.length === 0) {
    return (
      <div id="empty-cart">
        <div className="empty-cart-content">
          <img src={emptyCartImage} alt="Empty Cart" className="empty-cart-image" />
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added anything to your cart yet.</p>
          <button onClick={() => navigate("/home")}>Continue Shopping</button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      <div className="cart-items">
        {cartItems.map((item) => (
          <div className="cart-item" key={item.id}>
            <img src={item.image} alt={item.name} />
            <div className="cart-details">
              <h4>{item.name}</h4>
              <p>{item.author}</p>
              <p className="category">{item.category}</p>
              <p className="price">₹{(item.price * item.quantity).toFixed(2)}</p>

              <div className="quantity-controls">
                <button onClick={() => decrementQuantity(item.id)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => incrementQuantity(item.id)}>+</button>
              </div>

              <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <div className="total-section">
          <h3>Order Summary</h3>
          <div className="total-row">
            <span>Subtotal:</span>
            <span>₹{calculateTotal().toFixed(2)}</span>
          </div>
          <div className="total-row">
            <span>Tax:</span>
            <span>₹0.00</span>
          </div>
          <div className="total-row grand-total">
            <span>Total:</span>
            <span>₹{calculateTotal().toFixed(2)}</span>
          </div>
        </div>
        <div className="place-order-btn">
          <button onClick={placeOrder} className="place-order-btn">
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}
