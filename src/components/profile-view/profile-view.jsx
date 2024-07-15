import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import UserInfo from "./user-info";
import FavoriteMovies from "./favorite-movies";
import UpdateUser from "./update-user";
import "./profile-view.scss";

export function ProfileView({ movies, onUpdatedUserInfo }) {
  const localUser = JSON.parse(localStorage.getItem("user"));

  const favoriteMovieList = movies.filter((movie) => {
    return localUser.FavoriteMovies.includes(movie._id);
  });

  // each user in the database has a favoriteMovies attributes that stores an array of
  // their favorite movies.

  // I dont need to fetch all the users, like I did with all the movies.
  // This is because, my app starts with showing the LoginView. Then,
  // only once a user is looged in, the favoriteMovies are relevant. And, when
  // a user is logged in, I also have the details of that specific user.

  const getUser = () => {};

  const removeFav = (id) => {};

  const handleUpdate = (e) => {};

  const handleSubmit = (event) => {
    event.preventDegault();
  };

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
}
