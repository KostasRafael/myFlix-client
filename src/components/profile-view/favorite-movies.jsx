import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Figure, Button, Card } from "react-bootstrap";
import "./profile-view.scss";

export const FavoriteMovies = ({ moviesDisplay, setUserObject }) => {
  const localUserHere = JSON.parse(localStorage.getItem("user"));
  const [token, setToken] = useState(localStorage.getItem("token"));

  const removeFav = function (movieId) {
    const localUser = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");
    const url = `https://murmuring-ridge-94608-7a62e12e52db.herokuapp.com/users/${localUserHere.Username}/movies/${movieId}`;
    fetch(url, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    }).then((response) => {
      if (response.ok) {
        alert("movie deleted");
        response.json().then((json) => {
          localStorage.setItem("user", JSON.stringify(json));
          let localUser = JSON.parse(localStorage.getItem("user"));
          console.log("localUser", localUser);
          setUserObject(localUser);
        });
      } else {
        alert("deletion failed");
      }
    });
  };

  return (
    <Card>
      <Card.Body>
        <Row>
          <Col xs={12}>
            <h4>Favorite Movies</h4>
          </Col>
        </Row>
        <Row>
          {moviesDisplay.map(({ ImagePath, Title, Id }) => {
            return (
              <Col xs={12} md={6} lg={3} key={Id} className="fav-movie">
                <Figure>
                  <Link to={`/movies/${Id}`}>
                    <Figure.Image src={ImagePath} alt={Title} />

                    <Figure.Caption>{Title}</Figure.Caption>
                  </Link>
                </Figure>

                <Button variant="secondary" onClick={() => removeFav(Id)}>
                  Remove
                </Button>
              </Col>
            );
          })}
        </Row>
      </Card.Body>
    </Card>
  );
};
