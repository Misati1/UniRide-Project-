const { check, validationResult } = require('express-validator');
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const db = require.main.require('./models/db_controller');
const mysql = require('mysql');
const session = require('express-session');
const sweetalert = require('sweetalert2');

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'hmsystem'
});

router.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

// Define a GET route to render the login form
router.get('/', (req, res) => {
    res.render('login'); // Assuming you have a login.ejs file in your views directory
});

router.post('/', [
    check('username').notEmpty().withMessage("Username is required"),
    check('password').notEmpty().withMessage("Password is required")
], function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    var username = req.body.username;
    var password = req.body.password;
    console.log(username);

    if (username && password) {
        con.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password],
            function (error, results, fields) {
                if (results.length > 0) {
                    req.session.loggedin = true;
                    req.session.username = username;
                    res.cookie('username', username);
                    var status = results[0].email_status;
                    if (status === "not verified") {
                        res.send("Please Verify your email");
                    } else {
                        sweetalert.fire('Logged in');
                        res.redirect('/home');
                    }
                } else {
                    res.send("Incorrect Username or Password");
                }
                res.end();
            });
    } else {
        res.send("Please enter your username and password");
        res.end();
    }
});

module.exports = router;
