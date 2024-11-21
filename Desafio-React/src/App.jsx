import "./App.css";
import ProductList from "./Pages/Get/ProductList";
import Home from "./Pages/Home/home";
import PostProduct from "./Pages/Post/PostProduct";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import PutProduct from "./Pages/Put/PutProduct";

function App() {
  return (
    <div>
      <BrowserRouter>
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/get" element={<ProductList />} />
            <Route path="/post" element={<PostProduct />} />
            <Route path="/put" element={<PutProduct />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
