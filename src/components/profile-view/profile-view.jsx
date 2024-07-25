import { Container, Row, Col, Card } from "react-bootstrap";
import { FavoriteMovies } from "./favorite-movies";
import UserInfo from "./user-info";
import UpdateUser from "./update-user";
import { useState, useEffect } from "react";

export const ProfileView = ({ movies }) => {
  const localUser = JSON.parse(localStorage.getItem("user"));
  const emailOfUser = localUser.Email;
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [usersFavoriteMovies, setUsersFavoriteMovies] = useState([]);

  useEffect(() => {
    fetch(
      `https://murmuring-ridge-94608-7a62e12e52db.herokuapp.com/users/${localUser.Username}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((response) => response.json())
      .then((user) => {
        if (user.FavoriteMovies.length > 0) {
          setUsersFavoriteMovies(user.FavoriteMovies);
        }
      });
  }, []);

  const commonMovies = movies.filter((movie) => {
    return usersFavoriteMovies.includes(movie.Id);
  });

  function handleUserDelete() {
    const deleteUrl = `https://murmuring-ridge-94608-7a62e12e52db.herokuapp.com/users/${localUser.Username}`;
    fetch(deleteUrl, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    }).then((response) => {
      if (response.ok) {
        alert("user deleted");
        localStorage.clear();
        window.location.reload();
      } else {
        alert("deletion failed");
      }
    });
  }

  return (
    <Container>
      <Row>
        <Col xs={12} sm={4}>
          <Card>
            <Card.Body>
              <UserInfo
                nameOfUser={localUser.Username}
                emailOfUser={emailOfUser}
                handleUserDelete={handleUserDelete}
              />
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} sm={8}>
          <Card>
            <Card.Body>
              <UpdateUser />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <FavoriteMovies commonMovies={commonMovies} />
    </Container>
  );
};
