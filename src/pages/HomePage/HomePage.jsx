import { useEffect, useState } from "react";
import { fetchTrendingMovies } from "../../service/moviesServises";
import css from "./HomePage.module.css";
import MovieList from "../../components/MovieList/MovieList";

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

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
          <MovieList movies={movies} />
        </div>
      )}
    </>
  );
}
