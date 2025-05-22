import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import css from "./MoviesPage.module.css";
import { fetchMovieByQuery } from "../../service/moviesServises";
import MovieList from "../../components/MovieList/MovieList";

export default function MoviesPage() {
  const [inputValue, setInputValue] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get("query")?.trim() ?? "";

  const handleChange = (evt) => {
    setInputValue(evt.target.value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const trimmedQuery = inputValue.trim();

    if (trimmedQuery !== "") {
      setSearchParams({ query: trimmedQuery });
    } else {
      setSearchParams({});
    }

    setInputValue("");
  };

  useEffect(() => {
    if (query === "") return;

    setMovies([]);
    setError(false);
    setLoading(true);

    fetchMovieByQuery(query)
      .then((data) => {
        setMovies(data);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [query]);

  return (
    <div>
      <div className={css.searchBar}>
        <form onSubmit={handleSubmit} className={css.form}>
          <input
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search movies"
            value={inputValue}
            onChange={handleChange}
            className={css.input}
          />
          <button type="submit" className={css.button}>
            Search
          </button>
        </form>
      </div>
      {loading && (
        <strong className={css.loadingMessage}>Loading movies data...</strong>
      )}
      {error && (
        <p className={css.messageError}>
          Whoops, something went wrong! Please try reloading this page!
        </p>
      )}

      {!loading && !error && movies.length === 0 && query !== "" && (
        <p className={css.messageInfo}>No results found for your request.</p> // повідомлення, якщо не знайдено
      )}

      {!error && movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
}
