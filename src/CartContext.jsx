import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const CartContext = createContext({
  item: [],
  productsArray: [],
  getProductQuantity: () => {},
  addOneToCart: () => {},
  removeOneFromCart: () => {},
  deleteFromCart: () => {},
  getTotalCost: () => {},
  getProductData: () => {},
  postToInventory: () => {},
  deleteFromInventory: () => {},
});
const URI = `http://localhost:3000/store`;

export const CartProvider = ({ children }) => {
  const [cartProducts, setCartProducts] = useState([]);
  const [productsArray, setProductsArray] = useState([]);
  const [stockAdded, setStockAdded] = useState();
  const postToInventory = async (inventory) => {
    try {
      const response = await axios.post(URI, inventory);
      console.log(response.data.message);
      setStockAdded(response.data.count);
      toast.success(response.data.message);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(URI);
        setProductsArray(response.data);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchData();
  }, [stockAdded]);
  const deleteFromInventory = async (id) => {
    try {
      const response = await axios.delete(`${URI}/${id}`);
      setStockAdded(response.data.count);
      toast.error(response.data.message);
    } catch (error) {
      console.error(error.message);
    }
  };

  const getProductData = (id) => {
    let productData = productsArray.find((product) => product.id === id);
    if (productData === undefined) {
      console.log(`Product data does not exist for ID: ${id}`);
    }
    return productData;
  };

  const getProductQuantity = (id) => {
    const quantity = cartProducts.find((item) => item.id === id)?.quantity;
    if (quantity === undefined) {
      return 0;
    }
    return quantity;
  };

  const addOneToCart = (id) => {
    const quantity = getProductQuantity(id);
    if (quantity === 0) {
      setCartProducts([
        ...cartProducts,
        {
          id: id,
          quantity: 1,
        },
      ]);
    } else {
      setCartProducts(
        cartProducts.map((product) =>
          product.id === id
            ? { ...product, quantity: product.quantity + 1 }
            : product
        )
      );
    }
  };

  const removeOneFromCart = (id) => {
    const quantity = getProductQuantity(id);
    if (quantity == 1) {
      deleteFromCart(id);
    } else {
      setCartProducts(
        cartProducts.map((product) =>
          product.id === id
            ? { ...product, quantity: product.quantity - 1 }
            : product
        )
      );
    }
  };

  const deleteFromCart = (id) => {
    setCartProducts((cartProducts) =>
      cartProducts.filter((currentProduct) => currentProduct.id !== id)
    );
  };

  const getTotalCost = () => {
    let totalCost = 0;
    cartProducts.map((carItem) => {
      const productData = getProductData(carItem.id);
      totalCost += productData.price * carItem.quantity;
    });

    return totalCost;
  };

  const contextValue = {
    item: cartProducts,
    productsArray: productsArray,
    getProductQuantity,
    addOneToCart,
    removeOneFromCart,
    deleteFromCart,
    getTotalCost,
    getProductData,
    postToInventory,
    deleteFromInventory,
  };
  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};

export default CartProvider;
