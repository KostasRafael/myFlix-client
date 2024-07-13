import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import UserInfo from "./user-info";
import FavoriteMovies from "./favorite-movies";
import UpdateUser from "./update-user";
import "./profile-view.scss";

export function ProfileView({ movies, onUpdatedUserInfo }) {
  const [user, setUser] = useState;
}

return (
  <Container>
    <Row>
      <Col xs={12} sm={4}>
        <Card>
          <Card.Body>
            <UserInfo name={user.Username} email={user.Email} />
          </Card.Body>
        </Card>
      </Col>

      <Col xs={12} sm={8}>
        <Card>
          <Card.Body>
            <UserInfo name={user.Username} email={user.Email} />
            <FavoriteMovies favoriteMovieList={favoriteMovieList} />
            <UpdateUser
              handleSublit={handleSubmit}
              handleUpdate={handleUpdate}
            />
          </Card.Body>
        </Card>
      </Col>
    </Row>
    <FavoriteMovies favoriteMovieList={favoriteMovieList} />
  </Container>
);
