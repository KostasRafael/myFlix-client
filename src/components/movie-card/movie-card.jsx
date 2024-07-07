import PropTypes from "prop-types";

import { Button, Card } from "react-bootstrap";

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <Card ClassName="h-100">
      <Card.Img variant="top" src={movie.ImagePath} width="200" height="300" />
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Button onClick={() => onMovieClick(movie)} variant="link">
          Open
        </Button>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};
