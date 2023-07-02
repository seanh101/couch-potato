const session = require('express-session');
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const app = express();

// Always require and configure near the top
require('dotenv').config();
// Connect to the database
require('./config/database');
app.use(require('./config/checkToken'));



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
// app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'build')));

app.use((req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    try {
      const userId = jwt.verify(token, 'SEIRocks!');
      req.user = userId;
    } catch (error) {
      console.error('Error:', error);
    }
  }

  next();
});



const port = process.env.PORT || 3001;

// Put API routes here, before the "catch all" route
app.use('/api/users', require('./routes/api/users'));



app.use('/api/movies', require('./routes/api/movies'));

// The following "catch all" route (note the *) is necessary
// to return the index.html on all non-AJAX/API requests
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, function() {
  console.log(`Express app running on port ${port}`);
});

