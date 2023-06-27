// Search for movies using the OMDB API
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
  
  // Add a movie to favorites
  exports.addFavoriteMovie = async (req, res) => {
    const Movie = require('../models/movie');
    try {
      const { imdbID, title, plot, length } = req.body;
      const { user } = req.session;
  
      // Check if the movie already exists in favorites for the user
      const existingMovie = await Movie.findOne({ imdbID, user: user._id });
      if (existingMovie) {
        return res.status(400).json({ error: 'Movie already added to favorites' });
      }
  
      // Create a new movie instance with the provided data
      const newMovie = new Movie({
        imdbID,
        title,
        plot,
        length,
        user: user._id,
      });
  
      // Save the movie to the database
      await newMovie.save();
  
      res.status(201).json(newMovie);
    } catch (error) {
      console.error('Failed to add movie to favorites', error);
      res.status(500).json({ error: 'Failed to add movie to favorites' });
    }
  };
  