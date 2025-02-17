import { Container, Row, Col, Card } from "react-bootstrap";
import { FavoriteMovies } from "./favorite-movies";
import { useSelector, useDispatch } from "react-redux";
import { UserInfo } from "./user-info";
import { UpdateUser } from "./update-user";
import { useState, useEffect } from "react";
import "./ProfileView.css";
import { setUser } from "../../redux/reducers/user";

export const ProfileView = ({ movies }) => {
  const user = useSelector((state) => state.user);
  const userFavoriteMovies = user.FavoriteMovies;
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  // const [fetchedUserFavoriteMovies, setFetchedUserFavoriteMovies] = useState(
  //   []
  // );
  // const [userObject, setUserObject] = useState({ FavoriteMovies: [] });

  // console.log("user at 1st render", user);
  // console.log("userObject at 1st render", userObject);

  const moviesDisplay = movies.filter((movie) => {
    return userFavoriteMovies.includes(movie.Id);
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
        dispatch(setUser(null));
        // window.location.reload();
      } else {
        alert("deletion failed");
      }
    });
  }

  return (
    <Container
      className="p-0 m-0"
      fluid
      style={{ border: "5px solid red", backgroundColor: "black" }}
    >
      <Row>
        <Col style={{ border: "5px solid blue" }} xs={12} sm={4}>
          <Card className="info-card">
            <Card.Body>
              <UserInfo
                nameOfUser={user.Username}
                userEmail={user.Email}
                handleUserDelete={handleUserDelete}
              />
            </Card.Body>
          </Card>
        </Col>

        <Col style={{ border: "5px solid green" }} xs={12} sm={8}>
          <Card className="update-card">
            <Card.Body>
              <UpdateUser />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <FavoriteMovies moviesDisplay={moviesDisplay} />
    </Container>
  );
};
