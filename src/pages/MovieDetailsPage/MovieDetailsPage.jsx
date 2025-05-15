import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
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
      .get(`https://api.themoviedb.org/3/movie/${movieId}`, options)
      .then((res) => setMovie(res.data))
      .finally(() => setLoading(false));
  }, [movieId]);

  return (
    <div>
      <div>Movie Details Page: {movieId} </div>
      {loading && <strong>Loading movies data...</strong>}
      {movie && (
        <>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
          <div>
            <h1>{movie.title}</h1>
            <p></p>
          </div>
        </>
      )}
    </div>
  );
}

//const params = useParams();
//  console.log(params);   // Показує номер id в консолі

//const { movieId } = useParams();
// return <div>Movie Details Page: {movieId} </div>; // Додає id на сторінці

/*
З бекенду
 fetch(`https://api.themoviedb.org/3/movie/${movieId}`, options)
      .then((res) => res.json())
      .then((res) => console.log(res))
      .catch((err) => console.error(err));
      */
