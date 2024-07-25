import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie }) => {
  function handleFavoriteButton() {
    const token = localStorage.getItem("token");
    const localUser = JSON.parse(localStorage.getItem("user"));
    const movieId = movie.Id;
    const url = `https://murmuring-ridge-94608-7a62e12e52db.herokuapp.com/users/${localUser.Username}/movies/${movieId}`;
    fetch(url, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((user) => {
        console.log(user);
        alert("movie added");
      });
  }
  return (
    <Card className="h-100">
      <Card.Img variant="top" src={movie.ImagePath} width="200" height="300" />
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text>{movie.Description}</Card.Text>
        <Card.Text>Director: {movie.Director.Name}</Card.Text>
        <Link to={`/movies/${encodeURIComponent(movie.Id)}`}>
          <Button variant="link">Open</Button>
        </Link>
        <Button variant="button" onClick={handleFavoriteButton}>
          Add to favorites
        </Button>
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
