import React, { useEffect, useState } from 'react';
import './FavoriteMoviePage.css';

const FavoriteMoviePage = ({ user }) => {
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('https://couch-potato-api.onrender.com/api/movies/favorites', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const favorites = await response.json();
          setFavoriteMovies(favorites);
        } else {
          console.error('Failed to fetch favorite movies');
        }
      } catch (error) {
        console.error('Failed to fetch favorite movies', error);
      }
    };

    fetchFavorites();
  }, []);

  const handleToggleFavorite = (movieId) => {
    const token = localStorage.getItem('token');
    fetch(`https://couch-potato-api.onrender.com/api/movies/favorites/${movieId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setFavoriteMovies(data);
      })
      .catch((error) => console.error('Error:', error));
  };

  return (
    <div className="favorite-movies-container">
      <h1>Favorite Movies</h1>
      {favoriteMovies.length === 0 ? (
        <p>No favorite movies found.</p>
      ) : (
        <div>
          {favoriteMovies.map((movie) => (
            <div key={movie._id} className="movie-card">
              <h2 className="movie-title">{movie.title}</h2>
              <img className="movie-poster" src={movie.poster} alt={movie.title} />
              <p className="movie-details">{movie.plot}</p>
              <p className="movie-details"> {movie.length}</p>

              <div className="movie-actions">
                <button
                  className="toggle-favorite-button"
                  onClick={() => handleToggleFavorite(movie._id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoriteMoviePage;
