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

  return (
    <div>
      <h1>Favorite Movies</h1>
      {favoriteMovies.length === 0 ? (
        <p>No favorite movies found.</p>
      ) : (
        <div>
          {favoriteMovies.map((movie) => (
            <div key={movie.imdbID}>
              <h2>{movie.title}</h2>
              <img className="movie-poster" src={movie.Poster} alt={movie.Title} />
              <p>Plot: {movie.plot}</p>
              <p>Length: {movie.length}</p>
              <p>Is Favorite: {movie.isFavorite ? 'Yes' : 'No'}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoriteMoviePage;





