import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../redux/reducers/user";
import { dropRight } from "lodash";
import { MoviesFilter } from "../../components/movies-filter/movies-filter";
import "./NavigationBar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";

export const NavigationBar = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  return (
    <Navbar
      className={`fixed-top ${user ? "no-user-navbar" : "transparent-navbar"}`}
    >
      <Navbar.Brand className="no-user-brand brand" as={Link} to="/">
        myFlix
      </Navbar.Brand>
      {user && <MoviesFilter />}
      <Nav
        className="ms-auto nav-links"
        style={{
          marginRight: "10px",
          marginTop: "-28px",
        }}
      >
        {!user && (
          <>
            <Nav.Link
              className="nav-button no-user-navlinks"
              as={Link}
              to="/login"
            >
              Login
            </Nav.Link>
            <Nav.Link
              className="nav-button no-user-navlinks"
              as={Link}
              to="/signup"
            >
              Signup
            </Nav.Link>
          </>
        )}
        {user && (
          <>
            <Nav.Link className="nav-button" as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link className="nav-button" as={Link} to="/profile">
              Profile
            </Nav.Link>
            <Nav.Link
              className="nav-button"
              onClick={() => dispatch(setUser(null))}
            >
              Logout
            </Nav.Link>
          </>
        )}
      </Nav>
    </Navbar>
  );
};
