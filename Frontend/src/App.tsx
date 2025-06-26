import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import About from "./pages/About";
// import SellerHome from "./pages/SellerHome";
import Cart from "./components/Cart";
import Order from "./pages/Order";

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<About />} />
        {/* <Route path="/sellerhome" element={<SellerHome />} /> */}
        <Route path="/auth" element={<Auth />} />
        <Route path="/home" element={<Home />} />
        <Route path="*" element={<Cart />} />
        <Route path="Order" element={<Order />} />
      </Routes>
    </>
  )
}


export default App;
