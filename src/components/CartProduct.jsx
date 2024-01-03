import React from "react";
import { Button } from "react-bootstrap";
import { CartContext } from "../CartContext";
import { useContext } from "react";
import { getProductData } from "../productsArray";

const CartProduct = (props) => {
  const cart = useContext(CartContext);
  const id = props.id;
  const quantity = props.quantity;
  const productsData = getProductData(id);

  return (
    <>
      <h3>{productsData.title}</h3>
      <p>{quantity}</p>
      <p>${(quantity * productsData.price).toFixed(2)}</p>
      <Button size="sm" onClick={() => cart.deleteFromCart(id)}>
        Remove
      </Button>
      <hr></hr>
    </>
  );
};

export default CartProduct;
