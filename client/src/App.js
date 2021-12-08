import Navbar from "./components/Navbar";
import SingleProduct from "./pages/SingleProduct";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import AddProduct from "./pages/AddProduct";
import Cart from "./components/Cart";
import Register from "./pages/Register";
import Login from "./pages/Login";
import NotFound from "./components/NotFound";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:id" element={<SingleProduct />} />
        <Route path="/products/add" element={<AddProduct />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
