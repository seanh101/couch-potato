// Search for movies using the OMDB API
const Movie = require('../../models/movie');
const fetch = require('node-fetch');

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
  try {
    console.log('r body in afm', req.body)
    const { imdbID, title, plot, length, poster } = req.body;

    const movie = new Movie({
      imdbID,
      title,
      plot,
      length,
      poster,
      isFavorite: true,
    });

    await movie.save();

    res.status(201).json(movie);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to add movie to favorites' });
  }
};

  exports.removeFavoriteMovie = async (req, res) => {
    try {
      const movieId = req.params.id;
      // Find and remove the movie from the database
      await Movie.findByIdAndRemove(movieId);
      // Fetch the updated list of favorite movies
      const favoriteMovies = await Movie.find({ isFavorite: true });
      res.json(favoriteMovies);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Failed to remove favorite movie' });
    }
  };

  exports.getFavorites = async (req, res) => {
    
          // Retrieve all favorite movies from the database
          Movie.find({ isFavorite: true })
            .then((movies) => {
              res.status(200).json(movies);
            })
            .catch((error) => {
              res.status(500).json({ error: 'Failed to retrieve favorite movies' });
            });
       
  }

  exports.searchStream = async (req, res) => {
    try {
      const { searchTerm } = req.query;
  
      const response = await fetch(`https://api.watchmode.com/v1/search/?apiKey=zt7rzla8spN0MLB4LQI8TbHoNSKZLJpdFbKxJqPf&type=movie&search_field=name&search_value=${searchTerm}`);
      const data = await response.json();
  
      if (response.ok) {
        const { results } = data;
        res.json(results);
      } else {
        throw new Error('Failed to search movies');
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to search movies' });
    }
  };
  
  
  