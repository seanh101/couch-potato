import React, { useState, useEffect } from 'react';
import './SearchMoviePage.css';
import { getToken } from '../../utilities/users-service';

function SearchMoviePage({ user }) {
  const [searchResults, setSearchResults] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  const handleSearch = async (event) => {
    event.preventDefault();
    const searchTerm = event.target.elements.searchTerm.value;
    // Make a request to the OMDB API
    const response = await fetch(`http://www.omdbapi.com/?apikey=fa324692&s=${searchTerm}`);
    const data = await response.json();

    if (response.ok) {
      const { Search: movies } = data;
      const updatedMovies = await Promise.all(
        movies.map(async (movie) => {
          const movieResponse = await fetch(`http://www.omdbapi.com/?apikey=fa324692&i=${movie.imdbID}`);
          const movieData = await movieResponse.json();
          console.log('this is movie data: ', movieData);
          if (movieResponse.ok) {
            const { Plot, Runtime, Genre } = movieData;
            return {
              ...movie,
              Plot,
              Runtime,
              Genre,
            };
          } else {
            console.error('Failed to fetch movie details');
            return movie;
          }
        })
      );

      setSearchResults(updatedMovies);
    } else {
      console.error('Failed to search movies');
    }
  };

  const handleAddFavorite = async (movie) => {
    try {
      const response = await fetch('https://couch-potato-api.onrender.com/api/movies/favorites', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({
          imdbID: movie.imdbID,
          title: movie.Title,
          plot: movie.Plot,
          length: movie.Runtime,
          poster: movie.Poster,
        }),
      });

      if (response.ok) {
        const addedMovie = await response.json();
        setFavoriteMovies((prevFavorites) => [...prevFavorites, addedMovie]);
      } else {
        console.error('Failed to add movie to favorites');
      }
    } catch (error) {
      console.error('Failed to add movie to favorites', error);
    }
  };

  useEffect(() => {
    // Check if a movie is already in favorites and set its state accordingly
    setSearchResults((prevSearchResults) =>
      prevSearchResults.map((movie) => ({
        ...movie,
        isFavorite: favoriteMovies.some((favMovie) => favMovie.imdbID === movie.imdbID),
      }))
    );
  }, [favoriteMovies]);

  return (
    <div className="container">
      <h1>Search Movies & TV</h1>
      <form className="search-form" onSubmit={handleSearch}>
        <input className="search-input" type="text" name="searchTerm" placeholder="Enter movie title" />
        <button className="search-button-x" type="submit">
          Search
        </button>
      </form>
      <div className="search-results">
        {searchResults.map((movie) => (
          <div key={movie.imdbID} className="movie">
            <h2 className="movie-title">{movie.Title}</h2>
            <img className="movie-poster" src={movie.Poster} alt={movie.Title} />
            {movie.Plot && <p className="movie-details">Plot: {movie.Plot}</p>}
            {movie.Runtime && <p className="movie-details">Runtime: {movie.Runtime}</p>}
            {movie.Genre && <p className="movie-details">Genre: {movie.Genre}</p>}
            <p className="movie-year">Year: {movie.Year}</p>
            <button
              className={`favorite-button ${movie.isFavorite ? 'favorited' : ''}`}
              onClick={() => handleAddFavorite(movie)}
              disabled={movie.isFavorite}
            >
              {movie.isFavorite ? 'Added' : 'Add Favorite'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchMoviePage;













