import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setMovies } from "../../redux/reducers/movies";
import { useEffect } from "react";
import { moviesImages } from "../../../movies-images";
import Row from "react-bootstrap/Row";
import Heading from "../main-view/Heading";
import "bootstrap/dist/css/bootstrap.min.css";

import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

export const WelcomeView = () => {
  return (
    <Container fluid style={{ height: "100vh" }}>
      <Heading />
      <Row className="g-1">
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
                marginBottom: "10px", // Adds spacing between images
              }}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};
