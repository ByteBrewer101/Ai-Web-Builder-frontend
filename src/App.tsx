
import { HeroSection } from "./pages/hero-section";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

import TopBar from "./components/top-bar";
import ProductPage from "./pages/product-page";

export default function App() {

const nav = useNavigate


  return (
    <BrowserRouter>
      <TopBar />
      <Routes>
        <Route
            path="/"
            element={<HeroSection />}
          />
          <Route path="/product" element={<ProductPage />} />
      
      </Routes>
    </BrowserRouter>
  );
}
