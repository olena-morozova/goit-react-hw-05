import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import css from "./MovieReviews.module.css";
import { fetchMovieReviews } from "../../service/moviesServises";

export default function MovieReviews() {
  const { movieId } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [reviews, setReviews] = useState([]);

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

    fetchMovieReviews(movieId)
      .then((data) => setReviews(data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [movieId]);

  return (
    <div ref={sectionRef}>
      {loading && (
        <strong className={css.loadingMessage}>Loading reviews...</strong>
      )}
      {error && (
        <p className={css.messageError}>
          Whoops, something went wrong! Please try reloading this page!
        </p>
      )}
      {!loading && !error && reviews.length === 0 && (
        <p className={css.messageInfo}>
          We don't have any reviews for this movie
        </p>
      )}
      {reviews.length > 0 &&
        reviews.map((review) => (
          <div key={review.id} className={css.reviewItem}>
            <h2>Author: {review.author} </h2>
            <p>{review.content} </p>
          </div>
        ))}
    </div>
  );
}
