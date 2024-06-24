import { useState, useEffect } from "react";

import { MovieCard } from "../movie-card/movie-card";

import { MovieView } from "../movie-view/movie-view";

const MainView = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch("https://murmuring-ridge-94608-7a62e12e52db.herokuapp.com/movies")
      .then((response) => response.json())
      .then((movies) => {
        const moviesFromApi = movies.map((movie) => {
          return {
            Title: movie.Title,
          };
        });

        setMovies(moviesFromApi);
      });
  }, []);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView
        movie={selectedMovie}
        onBackClick={() => setSelectedMovie(null)}
      />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};

export default MainView;
