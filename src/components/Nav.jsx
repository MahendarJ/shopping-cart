import React, { useState, useContext } from "react";
import { Modal, Button, Navbar, Container } from "react-bootstrap";
import { CartContext } from "../CartContext";
import CartProduct from "./CartProduct";

const Nav = () => {
  const cart = useContext(CartContext);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const productsCount = cart.item.reduce(
    (sum, product) => sum + product.quantity,
    0
  );
  const checkout = async () => {
    await fetch("http://localhost:3000/checkout", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({
        items: cart.item,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        if (response.url) {
          window.location.assign(response.url);
        }
      });
  };
  return (
    <>
      <Navbar expand="sm">
        <Navbar.Brand href="/">Ecommerce store</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Button onClick={handleShow}>Cart {productsCount} Items</Button>
        </Navbar.Collapse>
      </Navbar>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Shopping Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {productsCount > 0 ? (
            <>
              <p>Items in your cart:</p>
              {cart.item.map((item, idx) => (
                <CartProduct
                  key={idx}
                  id={item.id}
                  quantity={item.quantity}
                ></CartProduct>
              ))}
              <h1>Total: {cart.getTotalCost().toFixed(2)}</h1>
              <Button variant="success" onClick={checkout}>
                Purchase items!
              </Button>
            </>
          ) : (
            <h1>There is no item in your cart</h1>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Nav;
