import React, { useCallback, useContext, useEffect, useState } from "react";
import axios from "axios";

// const url = "http://localhost:5000/api/v1/products";
const url = "https://ekart-express-api.herokuapp.com/api/v1/products";
const cartUrl = "https://ekart-express-api.herokuapp.com/api/v1/cart";
// const cartUrl = "http://localhost:5000/api/v1/cart";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [search, setSearch] = useState("");

  /**
   * @desc  Get all the products
   */
  const getProducts = useCallback(async () => {
    const response = await axios.get(`${url}?search=${search}`);
    setProducts(response.data.products);
  }, [search]);

  useEffect(() => {
    getProducts();
  }, [search, getProducts]);

  /**
   * @desc  Fetch items from a cart
   */
  const fetchCartItems = async () => {
    if (JSON.parse(localStorage.getItem("ekartToken"))) {
      const response = await axios.get(cartUrl, {
        headers: {
          Authorization:
            "Bearer " + JSON.parse(localStorage.getItem("ekartToken")).token,
        },
      });

      setCartItems(response.data.items);
      setCartCount(response.data.items.length);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, [cartCount]);

  return (
    <AppContext.Provider
      value={{
        products,
        getProducts,
        cartCount,
        setCartCount,
        cartItems,
        setCartItems,
        fetchCartItems,
        setSearch,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom Hook
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
