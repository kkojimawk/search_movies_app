import React, { useEffect, useState } from "react";
import "../App.css";
import Header from "./Header";
import Movie from "./Movie";
import Search from "./Search";

const MOVIE_API_URL = "https://www.omdbapi.com/?s=man&apikey=5d5e96a9";

const App = () => {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const data = async () => {
      const response = await fetch(MOVIE_API_URL);
      const json = await response.json();
      setMovies(json.Search);
      setLoading(false);
    };
    data();
  }, []);

  const search = async (searchValue) => {
    setLoading(true);
    setErrorMessage(null);
    const response = await fetch(
      `https://www.omdbapi.com/?s=${searchValue}&apikey=5d5e96a9`
    );
    const jsonResponse = await response.json();
    if (jsonResponse.Response === "True") {
      setMovies(jsonResponse.Search);
      setLoading(false);
    }
    if (jsonResponse.Response === "False") {
      setErrorMessage(jsonResponse.Error);
      setLoading(false);
    }
  };

  const moviePlotDisplay = async (imdbID) => {
    setErrorMessage(null);
    const response = await fetch(
      `http://www.omdbapi.com/?i=${imdbID}&plot=full&apikey=5d5e96a9`
    );
    const jsonResponse = await response.json();
    if (jsonResponse.Response === "True") {
      console.log(jsonResponse.Plot);
    }
    if (jsonResponse.Response === "False") {
      setErrorMessage(jsonResponse.Error);
    }
  };

  return (
    <div className="App">
      <Header text="HOOKED" />
      <Search search={search} />
      <p className="App-intro">Sharing a few of our favourite movies</p>
      <div className="movies">
        {loading && !errorMessage ? (
          <span>loading...</span>
        ) : errorMessage ? (
          <div className="errorMessage">{errorMessage}</div>
        ) : (
          movies.map((movie, index) => (
            <Movie
              key={`${index}-${movie.Title}`}
              movie={movie}
              moviePlotDisplay={moviePlotDisplay}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default App;
