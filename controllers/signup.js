const { check, validationResult } = require('express-validator');
<<<<<<< Updated upstream
=======
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const db = require.main.require('./models/db_controller');
const nodemailer = require('nodemailer');
const randomToken = require('random-token');
require('dotenv').config();
>>>>>>> Stashed changes

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var db = require.main.require('./models/db_controller');
var mysql = require('mysql');
var nodemailer = require('nodemailer');
var randomToken = require('random-token');
//const {check, validationResult} = require('express-validator');

router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

router.get('/', (req, res) => {
    res.render('signup');
});

router.post('/', [check('username').notEmpty().withMessage("Username is Required"),
    check('password').notEmpty().withMessage("Password is Required"),
    check('email').notEmpty().withMessage("Email is Required")
], function(req, res){
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({errors:errors.array()})
    }
    var email_status = "Not Verified";
    var email = req.body.email;
    var username = req.body.username;

    db.signup(req.body.username, req.body.email, req.body.password, email_status);
    var token =  randomToken(8);
    db.verify(req.body.username,email,token)

    db.getuserid(email, function(err, result){
        var id= result[0].id;
        var output = `<p>Dear `+username+`,</p>
        <p>Thank you for signing up. Your user verification ID and Token is given below:</p>
        <ul>
        <li>User ID: `+id+`</li>
        <li>Token: `+token+`</li>
        </ul>
        <p>Verification Link: <a href="http://localhost:3000/verify">Verify Here</p>
        <p>This is an automatically generated email</p>`;

        var transoporter= nodemailer.createTransport({
            host:"smtp.gmail.com",
            port: 465,
            secure: true,
<<<<<<< Updated upstream
            auth:{
                user:"ephraimloch@gmail.com", 
                pass:"88Carterraid&"
=======
            auth: {
                user: "ephraimloch@gmail.com",
                pass: "rvfgdjixhtmkybji" // Replace with your actual password or use environment variables for security
>>>>>>> Stashed changes
            }
        });
        var mailOptions = {
            from: '8ight@gmail.com',
            to: email,
            subject: 'Email Verification',
            html: output
        };
        transoporter.sendMail(mailOptions, function(err,info){
            if(err){
                return console.log(err);
            }
            console.log(info);
        });
        res.send("Check your email address for the token to complete your verification")
    })
});

module.exports= router;