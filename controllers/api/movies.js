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

exports.addFavoriteMovie = async (req, res) => {
    console.log('this is req.body',req.body)
  try {
    const { imdbID, title, plot, length, poster, user } = req.body;
    const movie = new Movie({
      imdbID,
      title,
      plot,
      length,
      poster,
      isFavorite: true,
      user, // Assign the user ID to the movie's user field
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
  try {
    // Retrieve all favorite movies from the database
    const favoriteMovies = await Movie.find({ isFavorite: true });
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
