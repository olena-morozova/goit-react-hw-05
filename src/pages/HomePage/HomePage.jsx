import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import css from "./HomePage.module.css";

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMjNhYmExNzczYTg3NjFmNWVhOTg2ZDFiMmEwZmE5MCIsIm5iZiI6MTc0NzIyOTExNC43OTUsInN1YiI6IjY4MjQ5OWJhMTAyODUyNTY4NTJkMmE0OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.U0AMF10vvzIiNTfXn3a8001NaNb6ryoIdERADyECvZI",
      },
    };

    setLoading(true);
    axios
      .get(
        "https://api.themoviedb.org/3/trending/movie/day?language=en-US",
        options
      )
      .then((res) => setMovies(res.data.results))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      {loading && <strong>Loading movies data...</strong>}
      {movies.length > 0 && (
        <div>
          <h1>Trending today</h1>
          <ul>
            {movies.map((movie) => (
              <li key={movie.id}>
                <Link className={css.link} to={`/movies/${movie.id}`}>
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
//{movie.backdrop_path}
/*<img
                    src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                    alt={movie.title}
                  />*/
