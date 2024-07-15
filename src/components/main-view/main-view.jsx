import { useState, useEffect } from "react";

import { MovieCard } from "../movie-card/movie-card";

import { MovieView } from "../movie-view/movie-view";

import { LoginView } from "../login-view/login-view";

import { SignupView } from "../signup-view/signup-view";

import { ProfileView } from "../profile-view/profile-view";

import { NavigationBar } from "../navigation-bar/navigation-bar";

import Row from "react-bootstrap/Row";

import Col from "react-bootstrap/Col";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [user, setUser] = useState(null); // user is set to null because null is treated as falsy for boolean operations
  const [token, setToken] = useState(null);

  useEffect(() => {
    if (!token) {
      return;
    }

    fetch("https://murmuring-ridge-94608-7a62e12e52db.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((movies) => {
        const moviesFromApi = movies.map((movie) => {
          return {
            Id: movie._id,
            Title: movie.Title,
            Description: movie.Description,
            Genre: movie.Genre,
            Director: movie.Director,
            ImagePath: movie.ImagePath,
          };
        });
        setMovies(moviesFromApi);
      });
  }, [token]);

  return (
    <BrowserRouter>
      <NavigationBar
        user={user}
        onLoggedOut={() => {
          setUser(null);
        }}
      />
      <Row className="justify-content-md-center">
        <Routes>
          <Route
            path="/signup"
            element={
              <>
                {user ? ( // if its a valid user, go to the "/" path, which displays the MovieCard.
                  <Navigate to="/" />
                ) : (
                  // otherwise, if its not a valid user, display teh SignUp View.
                  <Col md={5}>
                    <SignupView />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/login" //
            element={
              <>
                {user ? (
                  <Navigate to="/" /> // If its a valid user, got go the "/" path which will display the MovieCard.
                ) : (
                  // Otherwise, if its not a valid user, display the LoginView
                  <Col md={5}>
                    <LoginView
                      onLoggedIn={(user, token) => {
                        setUser(user);
                        setToken(token);
                      }}
                    />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/movies/:movieId"
            element={
              <>
                {!user ? ( // if its not a valid user, go to the "/login" path, which will display the LoginView.
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <Col md={8}>
                    <MovieView movies={movies} />
                  </Col>
                )}
              </>
            }
          />

          <Route
            path="profile"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : (
                  <>
                    <Col className="mb-4">
                      <ProfileView
                        movies={movies}
                        onUpdatedUserInfo={onUpdatedUserInfo}
                      />
                    </Col>
                  </>
                )}
              </>
            }
          />

          <Route
            path="/"
            element={
              <>
                {!user ? ( // if not a valid user, go to the path "/login", which  will display the LoginView.
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <>
                    {movies.map((movie) => (
                      <Col className="mb-4" key={movie.Id} md={3}>
                        <MovieCard movie={movie} />
                      </Col>
                    ))}
                  </>
                )}
              </>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};

export default MainView;
