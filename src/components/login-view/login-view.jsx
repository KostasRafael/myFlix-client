import React from "react";
import React, { useState } from "react";
import {
  Button,
  Form,
  Card,
  CardGroup,
  Container,
  Col,
  Row,
} from "react-bootstrap";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/reducers/user";
import "./LoginView.css";
import { moviesImages } from "../../../movies-images";
import "bootstrap/dist/css/bootstrap.min.css";

export const LoginView = () => {
  localStorage.clear();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    // this prevents the default behavior of the form which is to reload the entire page
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
    };

    fetch("https://murmuring-ridge-94608-7a62e12e52db.herokuapp.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("data", data);
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", data.token);
          dispatch(setUser(data.user));
        } else {
          alert("No such user");
        }
      })

      .catch((e) => {
        alert("Something went wrong");
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
            height: "300px",
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
            <Button variant="primary" type="submit">
              Login
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
