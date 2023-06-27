const express = require('express');
const movieController = require('../../controllers/api/movies');
const router = express.Router();

// Route for searching movies by title
router.get('/search', movieController.searchMovies);

module.exports = router;


