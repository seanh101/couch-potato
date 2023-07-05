const Movie = require('../../models/movie');
const fetch = require('node-fetch');
const Review = require('../../models/review');

exports.searchMovies = async (req, res) => {

  try {
    const { searchTerm } = req.query;

    // Make a request to the OMDB API
    const response = await fetch(`http://www.omdbapi.com/?apikey=fa324692&s=${searchTerm}`);
    const data = await response.json();

    if (response.ok) {
      const { Search: movies } = data;
      // Return the search results
      res.json(movies);
    } else {
      throw new Error('Failed to search movies');
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to search movies' });
  }
};

exports.addFavoriteMovie = async (req, res) => {
    try {
      const { imdbID, title, plot, length, poster } = req.body;
      const user = req.user; // Get the authenticated user from req.user
  
      const existingMovie = await Movie.findOne({ imdbID, user });
  
      if (existingMovie) {
        existingMovie.isFavorite = true;
        await existingMovie.save();
        res.status(200).json(existingMovie);
      } else {
        const movie = new Movie({
          imdbID,
          title,
          plot,
          length,
          poster,
          isFavorite: true,
          user: user, // Assign the user ID to the movie's user field
        });
  
        await movie.save();
  
        res.status(201).json(movie);
      }
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Failed to add movie to favorites' });
    }
  };
  

  exports.removeFavoriteMovie = async (req, res) => {
    try {
      const movieId = req.params.id;
      const user = req.user; // Get the authenticated user from req.user
  
      // Find and remove the movie only if it belongs to the authenticated user
      await Movie.findOneAndRemove({ _id: movieId, user: user._id });
  
      // Fetch the updated list of favorite movies for the user
      const favoriteMovies = await Movie.find({ user: user._id, isFavorite: true });
      res.json(favoriteMovies);
    } catch (error) {
      console.error('Error:', error);
    res.status(500).json({ error: 'Failed to remove favorite movie' });
  }
};

exports.getFavorites = async (req, res) => {
    try {
      const userId = req.user._id;
  
      // Retrieve favorite movies for the authenticated user only
      const favoriteMovies = await Movie.find({ user: userId, isFavorite: true });
  
      res.status(200).json(favoriteMovies);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Failed to retrieve favorite movies' });
    }
  };
  
  
  

exports.searchStream = async (req, res) => {
  try {
    const { searchTerm } = req.query;

    const url = `https://streaming-availability.p.rapidapi.com/v2/search/title?title=${searchTerm}&country=us&show_type=movie&output_language=en`;
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'd7ee4c629emshf758ca58b2f5e36p175e81jsn2d7040bbf526',
        'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com',
      },
    };

    const response = await fetch(url, options);
    const data = await response.json();

    if (response.ok) {
      res.json(data);
    } else {
      throw new Error('Failed to search movies');
    }
  } catch (error) {
    console.error('Failed to search movies', error);
    res.status(500).json({ error: 'Failed to search movies' });
  }
};

exports.addReview = async (req, res) => {
    try {
      const { movieId } = req.params;
      const { title, body } = req.body;
      const user = req.user; // Get the authenticated user from req.user
  
      const movie = await Movie.findOne({ _id: movieId, user });
  
      if (!movie) {
        return res.status(404).json({ error: 'Movie not found' });
      }
  
      const review = new Review({
        title,
        body,
        movie: movieId,
        user: user._id,
      });
  
      await review.save();
  
      movie.reviews.push(review._id);
      await movie.save();
  
      res.status(201).json({ review, movie });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Failed to add review' });
    }
  };
  
  exports.removeReview = async (req, res) => {
    try {
      const { reviewId } = req.params;
      const user = req.user; // Get the authenticated user from req.user
  
      const review = await Review.findOne({ _id: reviewId, user });
  
      if (!review) {
        return res.status(404).json({ error: 'Review not found' });
      }
  
      await review.remove();
  
      const movie = await Movie.findOne({ _id: review.movie });
      movie.reviews.pull(review._id);
      await movie.save();
  
      res.status(200).json({ review, movie });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Failed to remove review' });
    }
  };

 exports.rateMovie = async (req, res) => {
    try {
      const movie = await Movie.findById(req.params.id);
      
      if (!movie) {
        return res.status(404).json({ error: 'Movie not found' });
      }
      
      const { rating } = req.body;
      movie.rating = rating;
      
      await movie.save();
      
      res.json({ message: 'Movie rated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
  
  