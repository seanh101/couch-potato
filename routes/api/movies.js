const express = require('express');
const movieController = require('../../controllers/api/movies');
const router = express.Router();

router.get('/search', movieController.searchMovies);
router.get('/favorites', movieController.getFavorites);
router.get('/stream', movieController.searchStream);

router.post('/favorites', movieController.addFavoriteMovie);
router.delete('/favorites/:id', movieController.removeFavoriteMovie);

module.exports = router;




