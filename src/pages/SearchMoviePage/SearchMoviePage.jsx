import React, { useState } from 'react';

function SearchMoviePage() {
  const [searchResults, setSearchResults] = useState([]);

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

  return (
    <div>
      <h1>Search Movies</h1>
      <form onSubmit={handleSearch}>
        <input type="text" name="searchTerm" placeholder="Enter movie title" />
        <button type="submit">Search</button>
      </form>
      {/* Render the search results */}
      <div>
        {searchResults.map((movie) => (
          <div key={movie.imdbID}>
            <h2>{movie.Title}</h2>
            <p>Year: {movie.Year}</p>
            <img src={movie.Poster} alt={movie.Title} />
            {/* Render additional details */}
            {movie.Plot && <p>Plot: {movie.Plot}</p>}
            {movie.Runtime && <p>Runtime: {movie.Runtime}</p>}
            {movie.Genre && <p>Genre: {movie.Genre}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchMoviePage;









