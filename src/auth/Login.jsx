import { useState } from "react";
import { Button, Form, FormControl } from "react-bootstrap";
import { useAuth } from "./AuthProvider";

const Login = () => {
  const [input, setInput] = useState({
    username: "",
    password: "",
  });
  const auth = useAuth();

  const handleSubmitEvent = (e) => {
    e.preventDefault();
    if (input.username !== "" && input.password !== "") {
      auth.loginAction(input);
      return;
    }
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  console.log(input);
  return (
    <div style={{ height: "200px", width: "300px", marginLeft: "500px" }}>
      <Form onSubmit={handleSubmitEvent}>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <FormControl
            type="text"
            placeholder="Enter email"
            name="username"
            value={input.username}
            onChange={handleInput}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <FormControl
            type="password"
            placeholder="Enter password"
            name="password"
            value={input.password}
            onChange={handleInput}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default Login;
