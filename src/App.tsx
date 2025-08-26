// import react from "react-client";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Sidebar from "./Components/Sidebar";
import MainContent from "./Components/MainContent";
import ProductPage from "./Components/ProductPage";
import Topsellers from "./Components/Topsellers";
import PopularBlog from "./Components/PopularBlog";
import "./App.css";

function App() {
  return (
    <>
      <Router>
        <div className="flex">
          <Sidebar />

          <div className="rounded w-full flex justify-center flex-wrap">
            <Routes>
              <Route path="/" element={<MainContent />} />
              <Route path="/product/:id" element={<ProductPage />} />
            </Routes>
            <div>
              <Topsellers />
              <PopularBlog />
            </div>
          </div>
        </div>
      </Router>
    </>
  );
}

export default App;
