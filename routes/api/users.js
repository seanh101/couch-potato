const express = require('express');
const router = express.Router();
const usersCtrl = require('../../controllers/api/users');
const ensureLoggedIn = require('../../config/ensureLoggedIn');

// POST /api/users (create a user - sign up)
router.post('/', usersCtrl.create, (req, res) => {
  // Redirect to the homepage after successful sign-up
  res.redirect('/');
});

// POST /api/users/login (log in)
router.post('/login', usersCtrl.login, (req, res) => {
  // Redirect to the homepage after successful login
  res.redirect('/');
});

// GET /api/users/check-token (check user token)
router.get('/check-token', ensureLoggedIn, usersCtrl.checkToken);

// Insert ensureLoggedIn on all routes that need protecting

module.exports = router;
