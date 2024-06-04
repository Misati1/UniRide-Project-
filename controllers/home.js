const express = require('express');
const session = require('express-session');
const router = express.Router();
//const User = require('../models/db_controller');  // Make sure this path is correct

// Middleware to check if user is logged in
const checkAuth = (req, res, next) => {
  if (!req.session.loggedin) {
    console.log('User is not logged in!');
    return res.redirect('/login');
  }

  if (req.session.lockscreen)
  {
    return res.redirect('/login/lock-screen');
  }
  next();
};

// Route for the homepage
router.get('/', checkAuth, async (req, res) => {
  try {
    const user = {
      username: req.session.username,
    };

        if (!user) {
      return res.status(404).send('User not found');
    }
    res.render('home');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error loading user data');
  }
});

// Route to update profile
router.post('/updateProfile', checkAuth, async (req, res) => {
  try {
    const user = await User.findById(req.session.userId);
    if (!user) {
      return res.status(404).send('User not found');
    }

    user.username = req.body.username;
    user.email = req.body.email;
    user.phone = req.body.phone;
    user.location = req.body.location;
    user.vehicle = req.body.vehicle;

    await user.save();

    res.redirect('/home');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error updating user data');
  }
});

// Route to verify user
router.get('/verify', checkAuth, async (req, res) => {
  try {
    const user = await User.findById(req.session.userId);
    if (!user) {
      return res.status(404).send('User not found');
    }

    // Assuming you have a field like 'emailVerified' in your User model
    user.emailVerified = true;
    await user.save();

    res.redirect('/home');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error verifying user');
  }
});

module.exports = router;
