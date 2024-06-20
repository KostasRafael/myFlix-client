import { useState } from "react";

import { MovieCard } from "../movie-card/movie-card";

import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      Title: "The lakehouse",
      Description:
        "A lonely doctor who once occupied an unusual lakeside house begins to exchange love letters with its former resident, a frustrated architect. They must try to unravel the mystery behind their extraordinary romance before it's too late",
      Genre: "Romance",
      Director: "Alejandro Agresti",
    },

    {
      id: 2,
      Title: "Un Mundo Menos Peor",
      Description:
        "A woman reunites with her husband, who vanished from her life years ago.",
      Genre: "Drama",
      Director: "Alejandro Agresti",
    },

    {
      id: 3,
      Title: "Awakenings",
      Description:
        "The victims of an encephalitis epidemic many years ago have been catatonic ever since, but now a new drug offers the prospect of reviving them.",
      Genre: "Drama",
      Director: "Carole Penny Marshall",
    },

    {
      id: 4,
      Title: "Ford v Ferrari",
      Description:
        "American car designer Carroll Shelby and driver Ken Miles battle corporate interference and the laws of physics to build a revolutionary race car for Ford in order to defeat Ferrari at the 24 Hours of Le Mans in 1966.",
      Genre: "Action",
      Director: "James Mangold",
    },
  ]);

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
