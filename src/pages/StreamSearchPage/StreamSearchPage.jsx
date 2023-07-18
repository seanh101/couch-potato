import React, { useState } from 'react';
import './StreamSearchPage.css';
import logo from './potato3.jpeg';
import netflixLogo from './netflix-logo.png';
import primeVideoLogo from './prime-video-logo.png';
import disneyPlusLogo from './disney-plus-logo.png';
import hboMaxLogo from './hbo-max-logo.png';
import huluLogo from './hulu-logo.png';
import peacockLogo from './peacock-logo.png';
import paramountPlusLogo from './paramount-plus-logo.png';
import appleTVPlusLogo from './apple-tv-plus-logo.png';
import starzLogo from './starz-logo.png';
import showtimeLogo from './showtime-logo.png';

const streamingServiceLogos = {
  netflix: netflixLogo,
  'Amazon Prime Video': primeVideoLogo,
  'Disney+': disneyPlusLogo,
  'HBO Max': hboMaxLogo,
  hulu: huluLogo,
  Peacock: peacockLogo,
  'Paramount+': paramountPlusLogo,
  'Apple TV+': appleTVPlusLogo,
  Starz: starzLogo,
  Showtime: showtimeLogo,
};

const streamingServiceNames = {
  apple: 'Apple TV+',
  prime: 'Amazon Prime Video',
  paramount: 'Paramount+',
  hbo: 'HBO Max',
  hulu: 'Hulu',
  netflix: 'Netflix',
  peacock: 'Peacock',
  starz: 'Starz',
  showtime: 'Showtime',
  disney: 'Disney+',
};

function StreamSearchPage({ user }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [shake, setShake] = useState(false);


  const handleSearch = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `https://streaming-availability.p.rapidapi.com/v2/search/title?title=${searchTerm}&country=us&output_language=en`,
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
      <h3>Movie & TV Stream Finder</h3>
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
      {searchResults.length === 0 && (
        <div className="app-description">
          <p>Trying to watch a movie or show and can't find where it's streaming? Couch Potato has you covered.</p>
          <p>Couch Potato is a movie and TV show search engine that allows you to find out which services are streaming a certain movie or show.</p>
          <p>You'll also be able to view the plot details, cast, IMDb rating, and a clickable YouTube trailer. Enjoy!</p>
        </div>
      )}
      {searchResults.length === 0 && (
        <div className="api-credit">
          <p>Made with Movie of the Night API (TMDB API)</p>
        </div>
      )}
      <div className="search-results">
        {searchResults.map((movie) => (
          <div key={movie.imdbId} className="result-container">
            <h2 className="ff">{movie.title}</h2>
            {movie.posterURLs && Object.values(movie.posterURLs)[1] && (
              <img src={Object.values(movie.posterURLs)[1]} alt="Poster" />
            )}
            {movie.streamingInfo && movie.streamingInfo.us && (
              <div className="service">
                {Object.keys(movie.streamingInfo.us).length > 0 &&
                  Object.keys(movie.streamingInfo.us)
                    .filter((service) => service !== 'Starz' && service !== 'Showtime')
                    .map((service) => {
                      const serviceName = streamingServiceNames[service.toLowerCase()] || service;
                      return (
                        <img
                          key={serviceName}
                          src={streamingServiceLogos[serviceName]}
                          alt={serviceName}
                          className="service-logo"
                        />
                      );
                    })}
              </div>
            )}

            {!movie.showPlot ? (
              <button className="show-plot-button" onClick={() => handleTogglePlot(movie)}>
                Details
              </button>
            ) : (
              <>
                <p>{movie.overview}</p>
                <button className="hide-plot-button" onClick={() => handleTogglePlot(movie)}>
                  Hide Plot
                </button>
              </>
            )}

            {!movie.showCast ? (
              <button className="show-cast-button" onClick={() => handleToggleCast(movie)}>
                Cast
              </button>
            ) : (
              <>
                <p>{movie.cast.join(', ')}</p>
                <button className="hide-cast-button" onClick={() => handleToggleCast(movie)}>
                  Hide Cast
                </button>
              </>
            )}

            {movie.imdbRating && <p className="rating">IMDb Rating: {movie.imdbRating}%</p>}

            <p>
              <a href={movie.youtubeTrailerVideoLink} target="_blank" rel="noopener noreferrer">
                Watch Trailer
              </a>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StreamSearchPage;
