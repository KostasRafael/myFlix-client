import React from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./MovieCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import FavoriteButton from "../profile-view/FavoriteButton";
import { setUser } from "../../redux/reducers/user";

export const MovieCard = ({ movie }) => {
  const user = useSelector((state) => state.user);
  const token = localStorage.getItem("token");
  const localUser = JSON.parse(localStorage.getItem("user"));
  const movieId = movie.Id;
  const url = `https://murmuring-ridge-94608-7a62e12e52db.herokuapp.com/users/${user.Username}/movies/${movieId}`;
  const dispatch = useDispatch();
  const userFavoriteMovies = user.FavoriteMovies;

  function handleFavoriteButton() {
    fetch(url, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((updatedUser) => {
        console.log(updatedUser);
        alert("Movie added!");

        // Dispatch the updated user directly
        dispatch(setUser(updatedUser));
      })
      .catch((error) => console.error("Error adding movie:", error));
  }

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

  // If I have the fetchedUserFavoriteMovies here
  // I can check whether fetchedUserFavoriteMovies.includes(movieID)
  // If yes, heart color is red, if no, heart color is light red
  return (
    <Card className="movie-card h-100">
      <Card.Img
        variant="top"
        src={movie.ImagePath}
        width="auto"
        height="200px"
      />
      <Card.Body className="movie-card-content">
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text>{movie.Description}</Card.Text>
        <Card.Text>Director: {movie.Director.Name}</Card.Text>
        <Link to={`/movies/${encodeURIComponent(movie.Id)}`}>
          <Button
            variant="link"
            style={{ color: "white", backgroundColor: "red" }}
          >
            Open
          </Button>
        </Link>
        <FavoriteButton
          onToggle={
            userFavoriteMovies.includes(movieId)
              ? () => removeFav(movieId) // Pass movieId only to removeFav
              : handleFavoriteButton
          } // Direct reference to handleFavoriteButton
          movie={movie}
        />
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
    }).isRequired,
    ImagePath: PropTypes.string.isRequired,
  }).isRequired,
};
