import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Admin from "./pages/Admin";
import { ProductsProvider } from "./context/ProductsContext";

export default function App() {
  return (
    <ProductsProvider>
      <div className="app">
        <Navbar />
        <main className="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </ProductsProvider>
  );
}