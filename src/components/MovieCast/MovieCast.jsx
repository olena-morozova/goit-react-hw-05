import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import css from "./MovieCast.module.css";
import { fetchMovieCast } from "../../service/moviesServises";

export default function MovieCast() {
  const { movieId } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [actors, setActors] = useState([]);

  const sectionRef = useRef(null);

  useEffect(() => {
    sectionRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, []);

  useEffect(() => {
    setError(false);
    setLoading(true);

    fetchMovieCast(movieId)
      .then((data) => setActors(data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [movieId]);

  return (
    <ul className={css.castList} ref={sectionRef}>
      {loading && (
        <strong className={css.loadingMessage}>Loading cast...</strong>
      )}
      {error && (
        <p className={css.messageError}>
          Whoops, something went wrong! Please try reloading this page!
        </p>
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
