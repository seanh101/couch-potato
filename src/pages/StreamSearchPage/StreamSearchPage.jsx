import React, { useState } from 'react';
import './StreamSearchPage.css'

const StreamSearchPage = ({ user }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `https://streaming-availability.p.rapidapi.com/v2/search/title?title=${searchTerm}&country=us&show_type=movie&output_language=en`,
        {
          method: 'GET',
          headers: {
            'X-RapidAPI-Key': 'd7ee4c629emshf758ca58b2f5e36p175e81jsn2d7040bbf526',
            'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com',
          },
        }
      );
      const data = await response.json();
      

      if (response.ok) {
        setSearchResults(data.result); // Assuming the movie results are stored in the 'result' array
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
      {searchResults.map((movie) => (
    <div key={movie.imdbId}>
      <h2 class='ff'>{movie.title}</h2>
      {movie.posterURLs && Object.values(movie.posterURLs)[0] && (
  <img src={Object.values(movie.posterURLs)[0]} alt="Poster" />
)}

      <p>{movie.overview}</p>
      
      {movie.streamingInfo && movie.streamingInfo.us && (
  <p>Streaming on: {Object.keys(movie.streamingInfo.us).join(', ')}</p>
)}

        <p><a href={movie.youtubeTrailerVideoLink} target="_blank" rel="noopener noreferrer">Watch Trailer</a></p>
      
      

        
    
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




