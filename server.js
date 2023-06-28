const session = require('express-session');
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');

// Always require and configure near the top
require('dotenv').config();
// Connect to the database
require('./config/database');

const app = express();

app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  // Other session options...
}));

app.use(logger('dev'));
app.use(express.json());

// Configure both serve-favicon & static middleware
// to serve from the production 'build' folder
app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'build')));

// Import the Movie model
const Movie = require('./models/movie');

const port = process.env.PORT || 3001;

// Put API routes here, before the "catch all" route
app.use('/api/users', require('./routes/api/users'));


// Route handler to add a movie to favorites
// app.post('/api/movies/favorites', (req, res) => {
//   const { imdbID, title, plot, length } = req.body;

  // Create a new movie object with the necessary fields
  // const newMovie = new Movie({
  //   imdbID,
  //   title,
  //   plot,
  //   length,
  //   isFavorite: true,
  // });

  // Save the new movie to the database
//   newMovie.save()
//     .then(() => {
//       res.status(200).json({ message: 'Movie added to favorites' });
//     })
//     .catch((error) => {
//       res.status(500).json({ error: 'Failed to add movie to favorites' });
//     });
// });

// Route handler to get favorite movies
// app.get('/api/movies/favorites', (req, res) => {
//   // Retrieve all favorite movies from the database
//   Movie.find({ isFavorite: true })
//     .then((movies) => {
//       res.status(200).json(movies);
//     })
//     .catch((error) => {
//       res.status(500).json({ error: 'Failed to retrieve favorite movies' });
//     });
// });

app.use('/api/movies', require('./routes/api/movies'));

// The following "catch all" route (note the *) is necessary
// to return the index.html on all non-AJAX/API requests
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, function() {
  console.log(`Express app running on port ${port}`);
});

