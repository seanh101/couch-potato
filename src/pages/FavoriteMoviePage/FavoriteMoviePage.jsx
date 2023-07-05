import React, { useEffect, useState } from 'react';
import './FavoriteMoviePage.css';

const FavoriteMoviePage = ({ user }) => {
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [reviewBody, setReviewBody] = useState('');

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

  const handleAddReview = async (movieId, reviewBody) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://couch-potato-api.onrender.com/api/movies/favorites/${movieId}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ body: reviewBody }), // Pass the review body in the request body
      });

      if (response.ok) {
        const updatedMovies = await response.json();
        setFavoriteMovies(updatedMovies);
      } else {
        console.error('Failed to add review');
      }
    } catch (error) {
      console.error('Failed to add review', error);
    }
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
              <p className="movie-details">Plot: {movie.plot}</p>
              <p className="movie-details">Length: {movie.length}</p>
              <p className="movie-details">Is Favorite: {movie.isFavorite ? 'Yes' : 'No'}</p>
              {movie.reviews && movie.reviews.length > 0 && (
                <div className="movie-reviews">
                  <h3>Reviews</h3>
                  {movie.reviews.map((review) => (
                    <p key={review._id} className="review-body">
                      {review.body}
                    </p>
                  ))}
                </div>
              )}
              <div className="movie-actions">
                <button
                  className="toggle-favorite-button"
                  onClick={() => handleToggleFavorite(movie._id)}
                >
                  {movie.isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                </button>
                <input
                  type="text"
                  className="review-input"
                  placeholder="Add a review"
                  onChange={(e) => setReviewBody(e.target.value)}
                />
                <button
                  className="add-review-button"
                  onClick={() => handleAddReview(movie._id, reviewBody)}
                >
                  Add Review
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









