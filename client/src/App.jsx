import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Product from "./pages/Product";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import { useSelector } from "react-redux";
import Success from "./pages/Success";
import Shop from "./pages/Shop";
import Dashboard from "./pages/Dashboard";

const App = () => {
  const user = useSelector((state) => state.user.currentUser);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:category" element={<ProductList />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:slug" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/success" element={<Success />} />
        <Route
          path="/dashboard"
          element={!user ? <Navigate to="/login" /> : <Dashboard />}
        />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route
          path="/register"
          element={user ? <Navigate to="/" /> : <Register />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
