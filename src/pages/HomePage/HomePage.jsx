import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { fetchTrendingMovies } from "../../service/moviesServises";
import css from "./HomePage.module.css";

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const location = useLocation();

  useEffect(() => {
    setError(false);
    setLoading(true);
    fetchTrendingMovies()
      .then((data) => setMovies(data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      {loading && (
        <strong className={css.loadingMessage}>Loading movies data...</strong>
      )}
      {error && (
        <p className={css.messageError}>
          Whoops, something went wrong! Please try reloading this page!
        </p>
      )}
      {!error && movies.length > 0 && (
        <div>
          <h1>Trending today</h1>
          <ul>
            {movies.map((movie) => (
              <li key={movie.id}>
                <Link
                  className={css.link}
                  to={`/movies/${movie.id}`}
                  state={location}
                >
                  {movie.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
