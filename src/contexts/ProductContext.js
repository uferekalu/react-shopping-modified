import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const ProductsContext = createContext();

const url = "https://fakestoreapi.com/products";

const ProductsContextProvider = ({ children }) => {
  const [products, setProducts] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      (async () => {
        setLoading(true);
        const { data } = await axios.get(url);
        setProducts(data);
        setFilteredProducts(data);
        setLoading(false);
        console.log(data);
      })();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <main className="home">
      <ProductsContext.Provider
        value={{
          products,
          filteredProducts,
          setFilteredProducts,
          loading,
          setLoading
        }}
      >
        {children}
      </ProductsContext.Provider>
    </main>
  );
};
export default ProductsContextProvider;
