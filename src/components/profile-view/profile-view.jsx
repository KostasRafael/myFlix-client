import { Container, Row, Col, Card } from "react-bootstrap";
import { FavoriteMovies } from "./favorite-movies";
import { useSelector, useDispatch } from "react-redux";
import { UserInfo } from "./user-info";
import { UpdateUser } from "./update-user";
import { useState, useEffect } from "react";

export const ProfileView = ({ movies }) => {
  const user = useSelector((state) => state.user);
  const token = localStorage.getItem("token");
  const [fetchedUserFavoriteMovies, setFetchedUserFavoriteMovies] = useState(
    []
  );
  const [userObject, setUserObject] = useState({ FavoriteMovies: [] });

  console.log("userObject", userObject);

  useEffect(() => {
    fetch(
      `https://murmuring-ridge-94608-7a62e12e52db.herokuapp.com/users/${user}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((response) => response.json())
      .then((fetchedUser) => {
        setUserObject(fetchedUser);
      });
  }, []);

  let userEmail = userObject.Email;
  let userName = userObject.Username;

  useEffect(() => {
    if (userObject.FavoriteMovies.length > 0) {
      setFetchedUserFavoriteMovies(userObject.FavoriteMovies);
    }
  }, [userObject]);

  const moviesDisplay = movies.filter((movie) => {
    return fetchedUserFavoriteMovies.includes(movie.Id);
  });

  console.log("moviesDisplay", moviesDisplay);

  function handleUserDelete() {
    const deleteUrl = `https://murmuring-ridge-94608-7a62e12e52db.herokuapp.com/users/${user}`;
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
                nameOfUser={user}
                userEmail={userEmail}
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

      <FavoriteMovies
        moviesDisplay={moviesDisplay}
        setUserObject={setUserObject}
      />
    </Container>
  );
};
