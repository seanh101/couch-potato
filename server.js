const session = require('express-session');
const express = require('express');


const logger = require('morgan');
const app = express();
const cors = require('cors');

require('dotenv').config();
const jwt = require('jsonwebtoken');

require('./config/database');
app.use(require('./config/checkToken'));



app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,

}));

app.use(logger('dev'));
app.use(express.json());


app.use(cors({
  origin: ['http://localhost:3000', 'https://couch-potato.onrender.com']
}))

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


app.use('/api/users', require('./routes/api/users'));



app.use('/api/movies', require('./routes/api/movies'));


app.get('/*', function(req, res) {
  res.send('nothing found here');
});


app.listen(port, function() {
  console.log(`Express app running on port ${port}`);
});

