

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
