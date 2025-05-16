import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import css from "./MovieCast.module.css";
import { fetchMovieCast } from "../../service/moviesServises";

export default function MovieCast() {
  const { movieId } = useParams();
  const [loading, setLoading] = useState(false);
  const [actors, setActors] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetchMovieCast(movieId)
      .then((data) => setActors(data))
      .finally(() => setLoading(false));
  }, [movieId]);
  return (
    <ul className={css.castList}>
      {loading && (
        <strong className={css.loadingMessage}>Loading cast...</strong>
      )}
      {actors.length > 0 &&
        actors.map((actor) => (
          <li key={actor.id}>
            <img
              src={`https://image.tmdb.org/t/p/w300${actor.profile_path}`}
              alt={actor.name}
            />
            <p>{actor.name}</p>
            <p>{actor.character}</p>
          </li>
        ))}
    </ul>
  );
}

/*
const params = useParams();
  console.log(params);


  .then((res) => console.log(res.data));

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
        `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`,
        options
      )
      .then((res) => setActors(res.data.cast))
      .finally(() => setLoading(false));
  }, [movieId]);
  */
