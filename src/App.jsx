import React from "react";
import Nav from "./components/Nav";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Store from "./pages/Store";
import Success from "./pages/Success";
import Cancel from "./pages/Cancel";
import CartProvider from "./CartContext";
import Login from "./auth/Login";
import AuthProvider from "./auth/AuthProvider";
import PrivateRoute from "./auth/PrivateRoute";

const App = () => {
  return (
    <CartProvider>
      <Container>
        <Nav></Nav>
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route element={<PrivateRoute />}>
                <Route path="/store" element={<Store />} />
                <Route path="success" element={<Success />} />
                <Route path="cancel" element={<Cancel />} />
              </Route>
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </Container>
    </CartProvider>
  );
};

export default App;
