const { check } = require('express-validator');

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var db = require.main.require('./models/db_controller');
var mysql = require('mysql');
var session = require('express-session');
var sweetalert = require('sweetalert2');

const {check, validationResult} = require('express-validator');

var con = mysql.createConnection({
    host:'localhost',
    user: 'root',
    password: '',
    database: 'hmsystem'
});

router.use(session({
    secret:'secret',
    resave: true,
    saveUninitialized: true
}))

router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

router.post('/',[check('username').notEmpty().withMessage("Username is required"),
check('password').notEmpty().withMessage("Password is required")
], function(req, res){
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return response.status(422).json({errors:errors.array()})
    }
    var username = request.body.username;
    var password = request.body.password;
    console.log(username);

    if(username&&password){
        con.query('select * from users where username = ? and password = ?', [username,password], 
        function(error, results, fields){
            if(results.length>0){
                request.session.loggedin = true;
                request.session.username = username;
                express.response.cookie('username', usernme);
                var status = results[0].email_status;
                if(status=="not verified"){
                    response.send("Please Verify your email")
                }else{
                    sweetalert.fire('Logged in');
                    response.redirect('/home');
                }

            }else{
                response.send("Incorrect Username or Password");
            }
            response.end();
        })
    }else{
        response.send("Please enter your username and password");
        response.end();
    }
})

module.exports = router;