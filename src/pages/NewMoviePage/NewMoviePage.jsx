import React, { useState, useEffect } from 'react';
import './NewMoviePage.css';
import tmdbLogo from './tmdb.svg';
import { Helmet } from 'react-helmet';

function NewMoviePage() {
  const [movies, setMovies] = useState([]);
  const [releaseFilter, setReleaseFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [totalPages] = useState(100);
  const apiKey = '539644f6f1026689a82b58ff268f39f3';

  const getCurrentDate = () => {
    const currentDate = new Date();
    return currentDate.toISOString().split('T')[0];
  };

  const getLastTwoMonthsDate = () => {
    const currentDate = new Date();
    currentDate.setMonth(currentDate.getMonth() - 2);
    return currentDate.toISOString().split('T')[0];
  };

  const getNextTwoMonthsDate = () => {
    const currentDate = new Date();
    currentDate.setMonth(currentDate.getMonth() + 2);
    return currentDate.toISOString().split('T')[0];
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        let url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc&api_key=${apiKey}`;

        if (releaseFilter === 'newly-released') {
          url += `&primary_release_date.gte=${getLastTwoMonthsDate()}&primary_release_date.lte=${getCurrentDate()}`;
        } else if (releaseFilter === 'upcoming') {
          url += `&primary_release_date.gte=${getCurrentDate()}&primary_release_date.lte=${getNextTwoMonthsDate()}`;
        }

        const response = await fetch(url);
        const data = await response.json();

        if (response.ok) {
          // Filter movies by original_language "en" (English) and sort by popularity
          const filteredMovies = data.results.filter((movie) => movie.original_language === 'en');
          const sortedMovies = filteredMovies.sort((a, b) => b.popularity - a.popularity);
          setMovies(sortedMovies);
        } else {
          console.error('Failed to fetch movies');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchMovies();
  }, [releaseFilter, page, apiKey]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  // Add a state variable to track overview visibility
  const [overviewVisible, setOverviewVisible] = useState({});

  // Function to toggle overview visibility for a specific movie
  const toggleOverview = (movieId) => {
    setOverviewVisible((prevVisibility) => ({
      ...prevVisibility,
      [movieId]: !prevVisibility[movieId],
    }));
  };

  return (
    <>
    <Helmet>
      <title>New & Upcoming Movies - Couch Potato</title>
      <meta 
        name="description" 
        content="Discover new and upcoming movies. Stay updated with the latest releases and find out what's coming soon. Browse and explore a wide range of new and future movie releases." 
      />
      {/* Add other relevant meta tags here */}
    </Helmet>
    <div className="container">
    <h1>New & Upcoming Movies</h1>
    <img className="tmdb-logo" src={tmdbLogo} alt="TMDb Logo" />
    <div>
      <label>Release filter: </label>
      <select onChange={(e) => setReleaseFilter(e.target.value)} value={releaseFilter}>
        <option value="all">All</option>
        <option value="newly-released">Newly Released</option>
        <option value="upcoming">Upcoming Releases</option>
      </select>
    </div>
    <div className="movies">
      {movies.map((movie) => (
          <div key={movie.id} className="movie">
            <h2 className="movie-title">{movie.title}</h2>
            <img className="movie-poster" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
            {/* Button to toggle overview visibility */}
            <button onClick={() => toggleOverview(movie.id)}>Plot</button>
            {/* Show or hide overview based on visibility state */}
            {overviewVisible[movie.id] ? (
              <p className="movie-overview">{movie.overview}</p>
            ) : null}
            <p className="movie-release-date">Release Date: {movie.release_date}</p>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button onClick={() => handlePageChange(page - 1)} disabled={page === 1}>
          Previous Page
        </button>
        <span>Page {page} of {totalPages}</span>
        <button onClick={() => handlePageChange(page + 1)} disabled={page === totalPages}>
          Next Page
        </button>
      </div>
      <div className="tagline">
        This website uses TMDB and the TMDB APIs but is not endorsed, certified, or otherwise approved by TMDB.
      </div>
    </div>
    </>
  );
}

export default NewMoviePage;
