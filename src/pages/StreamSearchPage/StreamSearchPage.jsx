import React, { useState } from 'react';


const StreamSearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
 

  const handleSearch = async (event) => {
    
    event.preventDefault();

    try {
      const response = await fetch(`https://api.watchmode.com/v1/sources/?apiKey=zt7rzla8spN0MLB4LQI8TbHoNSKZLJpdFbKxJqPf&type=movie&search_field=name&search_value=${searchTerm}`);
      const data = await response.json();

      if (response.ok) {
        setSearchResults(data);
      } else {
        console.error('Failed to search movies');
      }
    } catch (error) {
      console.error('Failed to search movies', error);
    }
  };

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="stream-search-container">
      <h1>Stream Search</h1>
      <form className="search-form" onSubmit={handleSearch}>
        <input
          className="search-input"
          type="text"
          name="searchTerm"
          placeholder="Enter movie title"
          value={searchTerm}
          onChange={handleChange}
        />
        <button className="search-button" type="submit">
          Search
        </button>
      </form>
      <div className="search-results">
        {searchResults.map((data) => (
          <div key={data.id}>
            <img src={data.logo_100px}></img>
            <h2>{data.type}</h2>
            <h2>Regions: {data.regions.slice(0, 3).join(", ")}</h2>

          </div>
        ))}
      </div>
    </div>
  );
};
export default StreamSearchPage;
// {/* <div className="search-results">
// {searchResults.map((movie) => ( */}
// {/* <div key={movie.imdbID} className="movie">
//             <h2 className="movie-title">{movie.Title}</h2>
//             <img className="movie-poster" src={movie.Poster} alt={movie.Title} />
//             {/* Render additional details */}
            // {movie.Plot && <p className="movie-details">Plot: {movie.Plot}</p>}
            // {movie.Runtime && <p className="movie-details">Runtime: {movie.Runtime}</p>}
            // {movie.Genre && <p className="movie-details">Genre: {movie.Genre}</p>}
            // <p className="movie-year">Year: {movie.Year}</p> */}




