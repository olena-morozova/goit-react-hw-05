import { useState, useEffect } from "react";
import { Link, useSearchParams, useLocation } from "react-router-dom";
import css from "./MoviesPage.module.css";
import { fetchMovieByQuery } from "../../service/moviesServises";

export default function MoviesPage() {
  const [inputValue, setInputValue] = useState(""); // Стан для значення в інпуті
  const [movies, setMovies] = useState([]); // Стан для масиву знайдених фільмів
  const [loading, setLoading] = useState(false); // Стан для індикатора завантаження
  const [error, setError] = useState(false); // Стан для відображення помилки
  const [searchParams, setSearchParams] = useSearchParams(); // Робота з URL-параметрами

  const location = useLocation();

  const query = searchParams.get("query")?.trim() ?? ""; // Отримуємо параметр з URL, обрізаємо пробіли

  // Зміна значення в input
  const handleChange = (evt) => {
    setInputValue(evt.target.value); // Оновлюємо значення інпута
  };

  // Обробка форми пошуку
  const handleSubmit = (evt) => {
    evt.preventDefault(); // Забороняємо перезавантаження сторінки
    const trimmedQuery = inputValue.trim(); // Видаляємо пробіли на початку та в кінці

    if (trimmedQuery !== "") {
      setSearchParams({ query: trimmedQuery }); // Додаємо query до URL
    } else {
      setSearchParams({}); // Якщо інпут порожній — очищаємо параметри в URL
    }

    setInputValue(""); // Очищаємо інпут після натискання кнопки
  };

  // useEffect реагує на зміни query (тобто параметра в URL)
  useEffect(() => {
    if (query === "") return; // Якщо параметр порожній — нічого не робимо

    setMovies([]); // Очищаємо попередній список фільмів
    setError(false); // Скидаємо помилку
    setLoading(true); // Вмикаємо індикатор завантаження

    // Робимо запит через fetchMovieByQuery
    fetchMovieByQuery(query)
      .then((data) => {
        setMovies(data); // Зберігаємо результат запиту
      })
      .catch(() => {
        setError(true); // У разі помилки показуємо повідомлення
      })
      .finally(() => {
        setLoading(false); // Завантаження завершено
      });
  }, [query]); // Ефект виконується, коли query змінюється

  return (
    <div>
      <div className={css.searchBar}>
        <form onSubmit={handleSubmit} className={css.form}>
          <input
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search movies"
            value={inputValue}
            onChange={handleChange}
            className={css.input}
          />
          <button type="submit" className={css.button}>
            Search
          </button>
        </form>
      </div>
      {loading && <strong>Loading movies data...</strong>}
      {error && (
        <p className={css.messageError}>
          Whoops, something went wrong! Please try reloading this page!
        </p>
      )}

      {!loading && !error && movies.length === 0 && query !== "" && (
        <p className={css.messageInfo}>No results found for your request.</p> // повідомлення, якщо не знайдено
      )}

      {!error && movies.length > 0 && (
        <ul>
          {movies.map((movie) => (
            <li key={movie.id}>
              <Link
                className={css.link}
                to={`/movies/${movie.id}`}
                state={location}
              >
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


 useEffect(() => {
      setLoading(true);
      fetchTrendingMovies()
        .then((data) => setMovies(data))
        .finally(() => setLoading(false));
    }, []);

const [searchParams, setSearchParams] = useSearchParams;
  const query = searchParams.get("query") ?? "";
  console.log(query);
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
