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
      // Set the search results in the component state
      setSearchResults(movies);
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
            <p>{movie.Year}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchMoviePage;



