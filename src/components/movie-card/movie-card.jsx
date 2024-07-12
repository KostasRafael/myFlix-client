import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie }) => {
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
  onMovieClick: PropTypes.func.isRequired,
};
