import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Figure, Button } from "react-bootstrap";
import "./profile-view.scss";

function FavoriteMovies(favoriteMovieList) {
  const removeFav = (id) => {
    let token = localStorage.getItem("token");
    let url = `https://murmuring-ridge-94608-7a62e12e52db.herokuapp.com/users/${localStorage.getItem(
      "user"
    )}/movies/${id}`;
    axios.delete(url, {
      headers: { Authorization: `Bearer ${token}` },
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
          {favoriteMovieList.map(({ ImagePath, Title, _id }) => {
            return (
              <Col xs={12} md={6} lg={3} key={_id} className="fav-movie">
                <Figure>
                  <Link to={`/movies/${movies._id}`}>
                    <Figure.Image src={ImagePath} alt={Title} />

                    <Figure.Caption>{Title}</Figure.Caption>
                  </Link>
                </Figure>

                <Button variant="secondary" onClick={() => removeFav(_id)}>
                  Remove
                </Button>
              </Col>
            );
          })}
        </Row>
      </Card.Body>
    </Card>
  );
}

export default FavoriteMovies;