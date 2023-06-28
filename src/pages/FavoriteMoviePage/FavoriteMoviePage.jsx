import React, { useEffect, useState } from 'react';

const FavoriteMoviePage = () => {
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(() => {
    // Fetch favorite movies from the server
    fetch('/api/movies/favorites')
      .then((response) => response.json())
      .then((data) => setFavoriteMovies(data))
      .catch((error) => console.error('Error:', error));
  }, []);

  const handleToggleFavorite = (movieId) => {
    // Send a request to the server to remove the movie from favorites
    fetch(`/api/movies/favorites/${movieId}`, { method: 'DELETE' })
      .then((response) => response.json())
      .then((data) => {
        // Update the favorite movies list
        setFavoriteMovies(data);
      })
      .catch((error) => console.error('Error:', error));
  };

  return (
    <div>
      <h1>Favorite Movies</h1>
      {favoriteMovies.length === 0 ? (
        <p>No favorite movies found.</p>
      ) : (
        <div>
          {favoriteMovies.map((movie) => (
            <div key={movie._id}>
              <h2>{movie.title}</h2>
              <img className="movie-poster" src={movie.poster} alt={movie.title} />
              <p>Plot: {movie.plot}</p>
              <p>Length: {movie.length}</p>
              <p>Is Favorite: {movie.isFavorite ? 'Yes' : 'No'}</p>
              <button onClick={() => handleToggleFavorite(movie._id)}>Remove from Favorites</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoriteMoviePage;






