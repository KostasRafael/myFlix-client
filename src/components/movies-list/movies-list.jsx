import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { MovieCard } from "../../components/movie-card/movie-card";
import { MoviesFilter } from "../../components/movies-filter/movies-filter";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "bootstrap/dist/css/bootstrap.min.css";

export const MoviesList = () => {
  // If I have the fetchedUserFavoriteMovies here
  // I can pass the fetchedUserFavoriteMovies to the MovieCard

  const user = useSelector((state) => state.user);
  const filter = useSelector((state) => state.movies.filter)
    .trim()
    .toLowerCase();
  const token = localStorage.getItem("token");
  const movies = useSelector((state) => state.movies.list);
  // const [userObject, setUserObject] = useState({ FavoriteMovies: [] });
  //  const [fetchedUserFavoriteMovies, setFetchedUserFavoriteMovies] = useState(
  //   []
  // );
  const userFavoriteMovies = user.FavoriteMovies;

  console.log("user in redux store", user);
  console.log("Username from redux store", user.Username);
  console.log("user's favorite movies", userFavoriteMovies);

  // When the filter is empty, all movies make it through it.
  const filteredMovies = movies.filter((movie) =>
    movie.Title.toLowerCase().includes(filter)
  );
  return (
    <>
      <Row>
        {movies.length === 0 ? (
          <Col>The list is empty!</Col>
        ) : (
          filteredMovies.map((movie) => (
            <Col className="mb-4 mt-5" key={movie.id} sm={6} md={4} lg={3}>
              <MovieCard movie={movie} />
            </Col>
          ))
        )}
      </Row>
    </>
  );
};
