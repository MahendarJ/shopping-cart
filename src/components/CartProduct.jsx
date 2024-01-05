import React from "react";
import { Button } from "react-bootstrap";
import { CartContext } from "../CartContext";
import { useContext } from "react";

const CartProduct = ({ id, quantity }) => {
  const cart = useContext(CartContext);
  // const id = props.id;
  // const quantity = props.quantity;
  const productsData = cart.getProductData(id);

  return (
    <>
      <h3>{productsData.title}</h3>
      <p>{quantity} x &#x20B9;{productsData.price}</p>
      <p>&#x20B9;{(quantity * productsData.price).toFixed(2)}</p>
      <Button size="sm" onClick={() => cart.deleteFromCart(id)}>
        Remove
      </Button>
      <hr></hr>
    </>
  );
};

export default CartProduct;
