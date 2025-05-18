//import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
//import { useEffect } from "react";
import css from "./MoviesPage.module.css";
import { fetchMovieByQuery } from "../../service/moviesServises";

export default function MoviesPage() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (evt) => {
    setQuery(evt.target.value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    console.log("You searched for:", query);
    handleSearch(query);
    setQuery("");
  };

  const handleSearch = async (newQuery) => {
    setMovies([]);
    setError(false);
    setLoading(true);

    try {
      const res = await fetchMovieByQuery(newQuery);
      setMovies(res);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };
  /*
    useEffect(() => {
      setLoading(true);
      fetchTrendingMovies()
        .then((data) => setMovies(data))
        .finally(() => setLoading(false));
    }, []);*/

  return (
    <div>
      <div className={css.searchBar}>
        <form onSubmit={handleSubmit} className={css.form}>
          <input
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={query}
            onChange={handleChange}
            className={css.input}
          />
          <button type="submit" className={css.button}>
            Search
          </button>
        </form>
      </div>
      {loading && <strong>Loading movies data...</strong>}
      {error ? (
        <p>Whoops, something went wrong! Please try reloading this page!</p>
      ) : (
        <ul>
          {movies.map((movie) => (
            <li key={movie.id}>
              <Link className={css.link} to={`/movies/${movie.id}`}>
                {movie.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/*

 <div>
      <h1>Movies page</h1>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>
    </div>
  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMjNhYmExNzczYTg3NjFmNWVhOTg2ZDFiMmEwZmE5MCIsIm5iZiI6MTc0NzIyOTExNC43OTUsInN1YiI6IjY4MjQ5OWJhMTAyODUyNTY4NTJkMmE0OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.U0AMF10vvzIiNTfXn3a8001NaNb6ryoIdERADyECvZI",
      },
    };
    axios
      .get(
        "https://api.themoviedb.org/3/trending/movie/day?language=en-US",
        options
      )
      .then((res) => setMovies(res.data.results));
  }, []);
*/
