import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "./movie-view.scss";
import { useSelector } from "react-redux";

export const MovieView = () => {
  const movies = useSelector((state) => state.movies.list);
  const { movieId } = useParams();

  const movie = movies.find((m) => m.Id === movieId);

  return (
    <div>
      <div>
        <span>Title: </span>
        <span>{movie.Title}</span>
      </div>
      <div>
        <span>Description: </span>
        <span>{movie.Description}</span>
      </div>
      <div>
        <span>Genre: </span>
        <span>{movie.Genre.Name}</span>
      </div>
      <div>
        <span>Director: </span>
        <span>{movie.Director.Name}</span>
      </div>
      <div>
        <img src={movie.ImagePath} width="500" height="600" />
      </div>
      <Link to={`/`}>
        <button className="back-button">Back</button>
      </Link>
    </div>
  );
};
