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

//Define a GET route to render the login form
router.get('/', (req, res) => {
   res.render('login'); 
});

 router.get('/', (req, res) => {
     // Check if user is already logged in
     if (req.session.loggedin) {
         return res.redirect('/home'); // Redirect to home page if already logged in
     }
     res.render('login'); 
 });

router.post('/', [
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
                    } 
                } 
                else {
                    res.send("Incorrect Username or Password");
                    res.redirect('/login');
                }
                res.end();
            });
    } else {
        sweetalert.fire('Logged in');
        res.redirect('/home');
       // res.end();
    }
});

module.exports = router;
