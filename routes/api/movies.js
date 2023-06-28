const express = require('express');
const movieController = require('../../controllers/api/movies')
const router = express.Router();

// Route for searching movies by title
router.get('/search', movieController.searchMovies);

// Route for adding a movie to favorites
router.post('/favorites', movieController.addFavoriteMovie);

router.delete('/favorites/:id', movieController.removeFavoriteMovie);

module.exports = router;



