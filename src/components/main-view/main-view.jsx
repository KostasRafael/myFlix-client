import { useState, useEffect } from "react";

import { MovieCard } from "../movie-card/movie-card";

import { MovieView } from "../movie-view/movie-view";

import { LoginView } from "../login-view/login-view";

import { SignupView } from "../signup-view/signup-view";

import { NavigationBar } from "../navigation-bar/navigation-bar";

import { ProfileView } from "../profile-view/profile-view";

import Row from "react-bootstrap/Row";

import Col from "react-bootstrap/Col";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

import { setMovies } from "../../redux/reducers/movies";

import { MoviesList } from "../movies-list/movies-list";
export const MainView = () => {
  const movies = useSelector((state) => state.movies.list);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return; // useEffect skips the fetching process if there is no token, if token = null.
    // the first time the component MainView is executed, the fetching does not occur.

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
        dispatch(setMovies(moviesFromApi));
      });
  }, [token]);

  return (
    /*
     When saying first execution it is meant the first time the MainView components is executed. That is, when the MainView component is returned by
       the MyFlixApplication component within the indexed.js file.
        */
    <BrowserRouter>
      <NavigationBar />

      <Row className="justify-content-md-center">
        <Routes>
          <Route
            path="/signup" // at this path show the SignupView
            element={
              <>
                {user ? ( // Not true in the first execution as user = null
                  <Navigate to="/" />
                ) : (
                  // otherwise, if its not a valid user, display the Signup View.
                  <Col md={5}>
                    <SignupView />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/login" // at this path show the LoginView
            element={
              <>
                {user ? ( // Not true in the first execution as user = null.
                  <Navigate to="/" />
                ) : (
                  // true in the first execution as user = null.
                  <Col md={5}>
                    <LoginView />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/movies/:movieId" // at this path show the MovieView of the movie with movieId
            element={
              <>
                {!user ? ( // true in the first execution as user = null.
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? ( // false in the first execution as user = null. Not reached or executed in the first execution.
                  <Col>The list is empty!</Col>
                ) : (
                  <Col md={8}>
                    <MovieView />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="profile"
            element={
              <>
                {!user ? ( // true in the first execution as user = null.
                  <Navigate to="/login" replace />
                ) : (
                  // false in the first execution as user = null. Not reached or executed in the first execution.
                  <>
                    <Col className="mb-4">
                      <ProfileView movies={movies} />
                    </Col>
                  </>
                )}
              </>
            }
          />
          ;
          <Route
            path="/" //At this path show the MovieCard
            element={
              <>{!user ? <Navigate to="/login" replace /> : <MoviesList />}</>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};

export default MainView;
