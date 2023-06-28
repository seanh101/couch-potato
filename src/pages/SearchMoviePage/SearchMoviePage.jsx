import React, { useState } from 'react';
import './SearchMoviePage.css'; // Import the CSS file

function SearchMoviePage() {
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
      // Fetch additional details for new search results
      const updatedMovies = await Promise.all(
        movies.map(async (movie) => {
          const movieResponse = await fetch(`http://www.omdbapi.com/?apikey=fa324692&i=${movie.imdbID}`);
          const movieData = await movieResponse.json();
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
      // Set the updated search results in the component state
      setSearchResults(updatedMovies);
    } else {
      console.error('Failed to search movies');
    }
  };

  const handleAddFavorite = async (movie) => {
    const { Title, Plot, Runtime, Poster } = movie;
  
    try {
      const response = await fetch('/api/movies/favorites', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imdbID: movie.imdbID,
          title: Title,
          plot: Plot,
          length: Runtime,
          poster: Poster, // Add the movie poster to the request body
        }),
      });
  
      if (response.ok) {
        setFavoriteMovies((prevFavorites) => [...prevFavorites, movie]);
      } else {
        console.error('Failed to add movie to favorites');
      }
    } catch (error) {
      console.error('Failed to add movie to favorites', error);
    }
  };
  

  return (
    <div className="container">
      <h1>Search Movies & TV</h1>
      <form className="search-form" onSubmit={handleSearch}>
        <input className="search-input" type="text" name="searchTerm" placeholder="Enter movie title" />
        <button className="search-button" type="submit">Search</button>
      </form>
      {/* Render the search results */}
      <div className="search-results">
        {searchResults.map((movie) => (
          <div key={movie.imdbID} className="movie">
            <h2 className="movie-title">{movie.Title}</h2>
            <img className="movie-poster" src={movie.Poster} alt={movie.Title} />
            {/* Render additional details */}
            {movie.Plot && <p className="movie-details">Plot: {movie.Plot}</p>}
            {movie.Runtime && <p className="movie-details">Runtime: {movie.Runtime}</p>}
            {movie.Genre && <p className="movie-details">Genre: {movie.Genre}</p>}
            <p className="movie-year">Year: {movie.Year}</p>
            <button
              className={`favorite-button ${favoriteMovies.some((favMovie) => favMovie.imdbID === movie.imdbID) ? 'favorited' : ''}`}
              onClick={() => handleAddFavorite(movie)}
              disabled={favoriteMovies.some((favMovie) => favMovie.imdbID === movie.imdbID)}
            >
              {favoriteMovies.some((favMovie) => favMovie.imdbID === movie.imdbID)
                ? 'Added to Favorites'
                : 'Add Favorite'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchMoviePage;













