const express = require('express');
const session = require('express-session');
const router = express.Router();
//const User = require('../models/db_controller');
const app = express();

app.get('/index', (req, res) => {
  // Your logic to handle the /index route
  res.render('index'); // Assuming you have an 'index' view template
});

router.get('/', async (req, res) => {
  if (!req.session.userId) {
    return res.redirect('/login');
  }

  try {
    const user = await User.findById(req.session.userId);
    if (!user) {
      return res.status(404).send('User not found');
    }

    res.render('home', { user });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error loading user data');
  }
});

router.post('/updateProfile', async (req, res) => {
  if (!req.session.userId) {
    return res.redirect('/login');
  }

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

    res.redirect('/index');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error updating user data');
  }
});

router.get('/verify', async (req, res) => {
  // Validate the user (e.g., based on session or other criteria)
  // If valid, update the user's email status to "Verified"
  // Redirect to the home page upon successful verification
  try {
      const user = await User.findById(req.session.userId);
      if (!user) {
          return res.status(404).send('User not found');
      }

      // Update the user's email status to "Verified"
      // Assuming you have a field like 'emailVerified' in your User model
      user.emailVerified = true;
      await user.save();

      // Redirect to the home page
      res.redirect('/index');
  } catch (err) {
      console.error(err);
      res.status(500).send('Error verifying user');
  }
});

module.exports = router;