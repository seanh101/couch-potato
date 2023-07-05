import React, { useState } from 'react';
import './StreamSearchPage.css';
import logo from './potato3.jpeg'

function StreamSearchPage({ user }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [shake, setShake] = useState(false);

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
        setSearchResults(data.result);
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

  const handleTogglePlot = (movie) => {
    setSearchResults((prevResults) =>
      prevResults.map((prevMovie) => {
        if (prevMovie.imdbId === movie.imdbId) {
          return {
            ...prevMovie,
            showPlot: !prevMovie.showPlot,
          };
        }
        return prevMovie;
      })
    );
  };
  const handleToggleCast = (movie) => {
    setSearchResults((prevResults) =>
      prevResults.map((prevMovie) => {
        if (prevMovie.imdbId === movie.imdbId) {
          return {
            ...prevMovie,
            showCast: !prevMovie.showCast,
          };
        }
        return prevMovie;
      })
    );
  };


  const handleButtonClick = () => {
    setShake(true);

  
    setTimeout(() => {
      setShake(false);
    }, 1000); // Adjust the delay time as needed
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
   <div className={`shake ${shake ? 'animated' : ''}`}>
        <button className="search-button" type="submit" onClick={handleButtonClick}>
          <img className="logo" src={logo} alt="Logo" />
        </button>
      </div>

      </form>
      <div className="search-results">
        {searchResults.map((movie) => (
          <div key={movie.imdbId}>
            <h2 className="ff">{movie.title}</h2>
            {movie.posterURLs && Object.values(movie.posterURLs)[1] && (
              <img src={Object.values(movie.posterURLs)[1]} alt="Poster" />
            )}
            {movie.streamingInfo && movie.streamingInfo.us && (
          <div className="service">
            <h4> {Object.keys(movie.streamingInfo.us).join(', ')}</h4>
          </div>
            )}
      
          {!movie.showPlot && (
              <button
                className="show-plot-button"
                onClick={() => handleTogglePlot(movie)}
              >
                Details
              </button>
            )}

        
            {movie.showPlot && (
              <>
                <p>{movie.overview}</p>
                <button
                  className="hide-plot-button"
                  onClick={() => handleTogglePlot(movie)}
                >
                  Hide Plot
                </button>
              </>
            )}

            
            {!movie.showCast && (
              <button
                className="show-cast-button"
                onClick={() => handleToggleCast(movie)}
              >
                Cast
              </button>
            )}

            {movie.showCast && (
              <>
                <p>{movie.cast.join(', ')}</p>
                <button
                  className="hide-cast-button"
                  onClick={() => handleToggleCast(movie)}
                >
                  Hide Cast
                </button>
              </>
            )}
             <p><a href={movie.youtubeTrailerVideoLink} target="_blank" rel="noopener noreferrer">Watch Trailer</a></p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StreamSearchPage;














