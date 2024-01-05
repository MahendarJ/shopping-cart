import React, { useState, useContext } from "react";
import { Row, Col, Form, Button, FormControl } from "react-bootstrap";
import ProductCard from "../components/ProductCard";
import { CartContext } from "../CartContext";
import { useAuth } from "../auth/AuthProvider";

const Store = () => {
  const [inventory, setInventory] = useState({
    id: "",
    title: "",
    price: "",
  });
  const cart = useContext(CartContext);
  const auth = useAuth();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInventory((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    cart.postToInventory(inventory);
    setInventory({ id: "", title: "", price: "" });
  };

  return (
    <>
      <h1 align="center" className="p-3">
        Hot-Beverages inventory stocks
      </h1>
      <Button onClick={() => auth.logOut()}>Logout</Button>
      <div className="py-5">
        <h3>Mini admin panel</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Stripe Price id</Form.Label>
            <FormControl
              type="text"
              placeholder="Enter stripe price id"
              name="id"
              value={inventory.id}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <FormControl
              type="text"
              placeholder="Name"
              name="title"
              value={inventory.title}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Price</Form.Label>
            <FormControl
              type="number"
              placeholder="Price"
              name="price"
              value={inventory.price}
              onChange={handleChange}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
      <Row xs={1} md={3} className="g-4">
        {cart.productsArray.map((item, idx) => (
          <Col align="center" key={idx}>
            <ProductCard product={item} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Store;
