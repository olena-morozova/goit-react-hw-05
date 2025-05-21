import {
  NavLink,
  useParams,
  Outlet,
  Link,
  useLocation,
} from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import css from "./MovieDetailsPage.module.css";
import { fetchMovieById } from "../../service/moviesServises";

export default function MovieDetailsPage() {
  const location = useLocation();
  const backLinkRef = useRef(location.state);

  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(false);
    setLoading(true);

    fetchMovieById(movieId)
      .then((data) => setMovie(data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [movieId]);

  return (
    <div>
      <Link to={backLinkRef.current}>Go back</Link>
      {loading && (
        <strong className={css.loadingMessage}>Loading movies data...</strong>
      )}
      {error && (
        <p className={css.messageError}>
          Whoops, something went wrong! Please try reloading this page!
        </p>
      )}
      {!error && movie && (
        <div>
          <div className={css.movieContainer}>
            <img
              className={css.poster}
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
            <div className={css.info}>
              <h1>
                {movie.title} ({movie.release_date?.slice(0, 4)})
              </h1>
              <p>User score: {Math.round(movie.vote_average * 10)}%</p>
              <h2>Overview</h2>
              <p>{movie.overview}</p>
              <h3>Genres</h3>
              <p>{movie.genres?.map((g) => g.name).join(", ")}</p>
            </div>
          </div>
          <hr className={css.line} />
          <div className={css.additionalInfo}>
            <h2>Additional information</h2>

            <ul>
              <li>
                <NavLink to="cast">Cast</NavLink>
              </li>
              <li>
                <NavLink to="reviews">Reviews</NavLink>
              </li>
            </ul>
            <Outlet />
          </div>
          <hr className={css.line} />
        </div>
      )}
    </div>
  );
}
