import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMjNhYmExNzczYTg3NjFmNWVhOTg2ZDFiMmEwZmE5MCIsIm5iZiI6MTc0NzIyOTExNC43OTUsInN1YiI6IjY4MjQ5OWJhMTAyODUyNTY4NTJkMmE0OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.U0AMF10vvzIiNTfXn3a8001NaNb6ryoIdERADyECvZI",
  },
};

export const fetchTrendingMovies = async () => {
  const res = await axios.get("/trending/movie/day?language=en-US", options);
  return res.data.results;
};

export const fetchMovieById = async (movieId) => {
  const res = await axios.get(`/movie/${movieId}`, options);
  return res.data;
};

export const fetchMovieCast = async (movieId) => {
  const res = await axios.get(
    `/movie/${movieId}/credits?language=en-US`,
    options
  );
  return res.data.cast;
};

export const fetchMovieReviews = async (movieId) => {
  const res = await axios.get(
    `/movie/${movieId}/reviews?language=en-US&page=1`,
    options
  );
  return res.data.results;
};
