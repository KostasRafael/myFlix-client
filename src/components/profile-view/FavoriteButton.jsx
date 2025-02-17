import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

export default function FavoriteButton({ onToggle, movie }) {
  const user = useSelector((state) => state.user);
  const userFavoriteMovies = user.FavoriteMovies;
  // I have access to the user's FavoriteMovies
  // I have one

  return (
    <Button
      onClick={onToggle}
      style={{
        background: "none",
        border: "none",
        cursor: "pointer",
        padding: "10px",
      }}
      aria-label="Add to favorites"
    >
      <FontAwesomeIcon
        icon={faHeart}
        style={{
          color: userFavoriteMovies.includes(movie.Id) ? "red" : "#FFCCCB",
          transition: "color 0.3s ease-in-out",
        }}
        size="2x"
      />
    </Button>
  );
}
