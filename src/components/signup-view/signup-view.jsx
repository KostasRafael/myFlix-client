import { moviesImages } from "../../../movies-images";
import "bootstrap/dist/css/bootstrap.min.css";

import { useState } from "react";
import {
  Button,
  Form,
  Card,
  CardGroup,
  Container,
  Col,
  Row,
} from "react-bootstrap";
import "./SignupView.css";

export const SignupView = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday,
    };

    fetch("https://murmuring-ridge-94608-7a62e12e52db.herokuapp.com/users", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.ok) {
        alert("Signup successful");
        //window.location.reload();
      } else {
        alert("Signup failed");
      }
    });
  };

  return (
    <Container fluid id="container" className="p-0 m-0">
      <Container
        fluid
        id="card-group"
        style={{
          position: "fixed",
          top: "0",
          left: "0",
          width: "100vw",
          height: "100vh",
          background: "rgba(0, 0, 0, 0.6)",
          display: "flex",
          flex: "none",
          justifyContent: "center",
          alignItems: "center",
          zIndex: "10",
          pointerEvents: "none !important",
        }}
      >
        <Card
          id="card"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "500px",
            heigh: "400px",
          }}
        >
          <Form
            onSubmit={handleSubmit}
            style={{ margin: "2px", width: "400px" }}
          >
            <Form.Group controlId="formUsername">
              <Form.Label style={{ color: "white" }}>Username:</Form.Label>
              <Form.Control
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                minLength="3"
                placeholder="Enter a username"
              />
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label style={{ color: "white" }}>Password:</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter a password"
              />
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label style={{ color: "white" }}>Email:</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label style={{ color: "white" }}>Birthday:</Form.Label>
              <Form.Control
                type="date"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="primary" size="lg" type="submit">
              Sign up
            </Button>
          </Form>
        </Card>
      </Container>

      <Row className="g-0">
        {moviesImages.map((movieItem, index) => (
          <Col key={index} xs={6} sm={4} md={3} lg={2}>
            <img
              src={movieItem}
              alt={`Movie ${index}`}
              className="img-fluid"
              style={{
                width: "100%",
                height: "250px",
                objectFit: "cover",
              }}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};
