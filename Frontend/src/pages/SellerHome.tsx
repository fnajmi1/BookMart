// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "../styles/SellerHome.css";

// interface Seller {
//   name?: string;
//   email?: string;
// }

// interface Book {
//   id: number;
//   name: string;
//   author: string;
//   price: number;
//   quantity: number;
// }

// export default function SellerHome() {
//   const navigate = useNavigate();
//   const seller: Seller = JSON.parse(localStorage.getItem("seller") || "{}");

//   const [books, setBooks] = useState<Book[]>([]);

//   useEffect(() => {
//     if (!seller.name) {
//       navigate("/auth");
//     }

//     const storedBooks = JSON.parse(localStorage.getItem("sellerBooks") || "[]");
//     setBooks(storedBooks);
//   }, []);

//   const totalBooks = books.length;
//   const totalQuantity = books.reduce((sum, b) => sum + b.quantity, 0);
//   const totalValue = books.reduce((sum, b) => sum + b.price * b.quantity, 0);

//   return (
//     <div className="seller-dashboard">
//       <h2>Welcome, {seller.name || "Seller"} 📚</h2>

//       <div className="dashboard-stats">
//         <div className="stat-card">
//           <h3>{totalBooks}</h3>
//           <p>Total Books Listed</p>
//         </div>
//         <div className="stat-card">
//           <h3>{totalQuantity}</h3>
//           <p>Total Stock</p>
//         </div>
//         <div className="stat-card">
//           <h3>₹{totalValue}</h3>
//           <p>Total Inventory Value</p>
//         </div>
//       </div>

//       <div className="dashboard-actions">
//         <button onClick={() => navigate("/seller/add-book")}>➕ Add New Book</button>
//         <button onClick={() => navigate("/seller/my-books")}>📖 View & Manage Books</button>
//         <button onClick={() => navigate("/seller/orders")}>📦 View Orders</button>
//       </div>
//     </div>
//   );
// }