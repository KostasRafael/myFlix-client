import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Figure, Button, Card } from "react-bootstrap";
import "./profile-view.scss";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../redux/reducers/user";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import "./FavoriteMovies.css";

export const FavoriteMovies = ({ moviesDisplay }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const removeFav = function (movieId) {
    const token = localStorage.getItem("token");
    const url = `https://murmuring-ridge-94608-7a62e12e52db.herokuapp.com/users/${user.Username}/movies/${movieId}`;
    fetch(url, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    }).then((response) => {
      if (response.ok) {
        alert("movie deleted");
        response.json().then((json) => {
          dispatch(setUser(json));
        });
      } else {
        alert("deletion failed");
      }
    });
  };

  const leftHearts = [1, 2, 3, 4, 5];
  const rightHearts = [1, 2, 3, 4, 5];

  return (
    <Card style={{ backgroundColor: "black" }}>
      <Card.Body>
        <Row>
          <Col xs={12}>
            <div className="favorite-header">
              <div className="hearts">
                {[...Array(5)].map((_, index) => (
                  <FontAwesomeIcon
                    key={index}
                    icon={faHeart}
                    className="heart-icon"
                  />
                ))}
              </div>

              <h1 className="title">Favorite Movies</h1>

              <div className="hearts">
                {[...Array(5)].map((_, index) => (
                  <FontAwesomeIcon
                    key={index}
                    icon={faHeart}
                    className="heart-icon"
                  />
                ))}
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          {moviesDisplay.map(({ ImagePath, Title, Id }) => {
            return (
              <Col xs={12} md={6} lg={3} key={Id} className="fav-movie">
                <Figure>
                  <Link to={`/movies/${Id}`}>
                    <Figure.Image
                      src={ImagePath}
                      alt={Title}
                      style={{ maxHeight: "250px", maxWidth: "100%" }}
                    />

                    <Figure.Caption
                      style={{ color: "white", fontSize: "1.6rem" }}
                    >
                      {Title}
                    </Figure.Caption>
                  </Link>
                </Figure>

                <Button
                  variant="secondary"
                  onClick={() => removeFav(Id)}
                  style={{ backgroundColor: "red", color: "white" }}
                >
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
