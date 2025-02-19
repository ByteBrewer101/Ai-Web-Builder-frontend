import { HeroSection } from "./pages/hero-section";
import { BrowserRouter, Routes, Route} from "react-router-dom";

import TopBar from "./components/top-bar";
import ProductPage from "./pages/product-page";
import TestingPage from "./pages/testingPage";
import { RecoilRoot } from "recoil";

export default function App() {
 

  return (
    <RecoilRoot>
      <BrowserRouter>
        <TopBar />
        <Routes>
          <Route path="/" element={<HeroSection />} />
          <Route path="/product" element={<ProductPage />} />
          <Route path="/testing" element={<TestingPage />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}
