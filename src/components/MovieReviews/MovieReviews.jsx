import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import css from "./MovieReviews.module.css";
import { fetchMovieReviews } from "../../service/moviesServises";

export default function MovieReviews() {
  const { movieId } = useParams();
  const [loading, setLoading] = useState(false);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    setLoading(true);

    fetchMovieReviews(movieId)
      .then((data) => setReviews(data))
      .finally(() => setLoading(false));
  }, [movieId]);

  return (
    <div>
      {loading && (
        <strong className={css.loadingMessage}>Loading reviews...</strong>
      )}
      {reviews.length > 0 &&
        reviews.map((review) => (
          <div key={review.id}>
            <h2>Author: {review.author} </h2>
            <p>{review.content} </p>
          </div>
        ))}
    </div>
  );
}

//We don't have any reviews for this movie
//Author:

/*
1) const params = useParams();
  console.log(params); Бачимо в консолі наш параметр - ід фільму.
  2) замінюємо const { movieId } = useParams();
  3) зкопійований код "https://api.themoviedb.org/3/movie/movie_id/reviews?language=en-US&page=1"
  замінюємо `https://api.themoviedb.org/3/movie/${movieId}/reviews?language=en-US&page=1`
  4) const reviews = [];

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
        `https://api.themoviedb.org/3/movie/${movieId}/reviews?language=en-US&page=1`,
        options
      )
      .then((res) => setReviews(res.data.results))
      .finally(() => setLoading(false));
  }, [movieId]);
  */
