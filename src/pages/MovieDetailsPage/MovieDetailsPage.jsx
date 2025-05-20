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

  useEffect(() => {
    setLoading(true);
    fetchMovieById(movieId)
      .then((data) => setMovie(data))
      .finally(() => setLoading(false));
  }, [movieId]);

  return (
    <div>
      <Link to={backLinkRef.current}>Go back</Link>
      {loading && <strong>Loading movies data...</strong>}
      {movie && (
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

//const params = useParams();
//  console.log(params);   // Показує номер id в консолі

//const { movieId } = useParams();
// return <div>Movie Details Page: {movieId} </div>; // Додає id на сторінці

/*
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
      .get(`https://api.themoviedb.org/3/movie/${movieId}`, options)
      .then((res) => setMovie(res.data))
      .finally(() => setLoading(false));
  }, [movieId]);


З бекенду
 fetch(`https://api.themoviedb.org/3/movie/${movieId}`, options)
      .then((res) => res.json())
      .then((res) => console.log(res))
      .catch((err) => console.error(err));
      */
