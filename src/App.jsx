import { lazy, Suspense } from "react";

import { Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation";
//import HomePage from "./pages/HomePage/HomePage";
//import MoviesPage from "./pages/MoviesPage/MoviesPage";
//import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
//import MovieDetailsPage from "./pages/MovieDetailsPage/MovieDetailsPage";
import MovieCast from "./components/MovieCast/MovieCast";
import MovieReviews from "./components/MovieReviews/MovieReviews";

const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const MoviesPage = lazy(() => import("./pages/MoviesPage/MoviesPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage/NotFoundPage"));
const MovieDetailsPage = lazy(() =>
  import("./pages/MovieDetailsPage/MovieDetailsPage")
);

function App() {
  return (
    <div>
      <Navigation />
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/movies" element={<MoviesPage />}></Route>
          <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
          </Route>
          <Route path="*" element={<NotFoundPage />}></Route>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
/* 
/movies/:movieId/cast – компонент MovieCast
/movies/:movieId/reviews – компонент MovieReviews




useEffect(() => {
    const url =
      "https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1&query=batman";

    const options = {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMjNhYmExNzczYTg3NjFmNWVhOTg2ZDFiMmEwZmE5MCIsIm5iZiI6MTc0NzIyOTExNC43OTUsInN1YiI6IjY4MjQ5OWJhMTAyODUyNTY4NTJkMmE0OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.U0AMF10vvzIiNTfXn3a8001NaNb6ryoIdERADyECvZI",
      },
    };

    axios
      .get(url, options)
      .then((response) => {
        console.log("Дані з TMDB:", response.data);
      })
      .catch((err) => console.error("Помилка:", err));
  }, []);

  return (
    <div>
      <h1>Пошук фільмів</h1>
      <p>Відкрий консоль (F12), щоб побачити результат запиту.</p>
    </div>
  )*/
/*



/*const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMjNhYmExNzczYTg3NjFmNWVhOTg2ZDFiMmEwZmE5MCIsIm5iZiI6MTc0NzIyOTExNC43OTUsInN1YiI6IjY4MjQ5OWJhMTAyODUyNTY4NTJkMmE0OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.U0AMF10vvzIiNTfXn3a8001NaNb6ryoIdERADyECvZI",
    },
  };

  fetch(
    "https://api.themoviedb.org/3/trending/movie/day?language=en-US",
    options
  )
    .then((res) => res.json())
    .then((res) => console.log(res))
    .catch((err) => console.error(err));*/
