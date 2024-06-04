const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bodyParser = require('body-parser');
const session = require('express-session');
const mysql = require('mysql');
const sweetalert = require('sweetalert2');
const db = require.main.require('./models/db_controller');

// Create a MySQL connection
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'hmsystem'
});

// Middleware
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
router.use(session({ secret: 'secret', resave: true, saveUninitialized: true }));

// GET route to render the login form
router.get('/', (req, res) => {
    console.log("We are going to render the login page");
   res.render('login'); 
});

router.get('/logout', (req, res) => {
    req.session.loggedin = false;
    console.log("logged out!");
   res.redirect('/login');
});

router.get('/lock-screen', (req, res) => {
    req.session.lockscreen = true;
    console.log("screen locked");
   res.render('lockscreen');
});

router.post('/unlock-screen', (req, res) => {
    req.session.lockscreen = false;
    console.log("unlocked screen!");
   res.redirect('/home');
});

// Route to handle login form submission
router.post('/', async (req, res) => {
    const { email, password } = req.body;

        if (true) {
        // Set session variables
        req.session.loggedin = true;
        req.session.lockscreen = false;
        req.session.username = "misatisharly@gmail.com"; // Assuming email is used as username
        // Redirect to the home page

        
        message = {
            status: 200,
            message: "Login successful. Welcome!",
        };

        console.log("Logged in successfully");
        res.redirect('/home');
    } else {
        // Handle login failure
       return {
        error: "Login unsuccessful",
       };
    }
});


module.exports = router;
