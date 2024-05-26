var express = require('express');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var path = require('path');
var ejs = require('ejs');
var http = require('http');
var db = require('./models/db_controller');
var signup = require('./controllers/signup');
var login = require('./controllers/login');
var verify = require('./controllers/verify');
var reset = require('./controllers/reset_controller');
var drivers = require('./controllers/drivers_controller');
var employee = require('./controllers/employee');
var ride = require('./controllers/ride');

var app = express();

app.set('view engine', 'ejs');
app.use(express.static('./public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// Session middleware setup
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

// Route handlers
app.use('/signup', signup);
app.use('/login', login); // New login route
app.use('/verify', verify);
app.use('/reset', reset);
app.use('/drivers', drivers);
app.use('/employee', employee);
app.use('/ride', ride);
<<<<<<< HEAD
//app.use('/receipt', receipt);
//app.use('/complain', complain);

//app.use ('/inbox',inbox);
=======

//app.use('/receipt', receipt);
//app.use('/complain', complain);

//app.use ('/inbox',inbox

const PORT = process.env.PORT || 3000;
const server = http.createServer(app);
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

require('dotenv').config();

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_SECURE === 'true', // Convert to boolean
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});

>>>>>>> e7f18d49015bb1a907e63f32f5b99554d8b22502
