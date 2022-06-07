import { useState } from "react";
import Products from "./components/Products";
import { GlobalProvider } from "./context/GlobalState";

export default function App() {
  const [products, setProducts] = useState([]);

  return (
    <GlobalProvider>
      <div className="app">
        <Products />
      </div>
    </GlobalProvider>
  );
}
