var express = require('express');
var flash = require('flash');
var router = express.Router();
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
var randomToken = require('random-token');
var db = require.main.require('./models/db_controller');


router.get('/', function(req, res){
    res.render('forgotpassword.ejs');
})

router.post('/', function(req, res){
    var email = request.boody.email;
    db.findOne(email, function(err, result){
        if(!resultone){
            console.log("Email does not exist");
            response.send("Mail does not exist");
        }
        var id = result[0].id;
        var email = result[0].email;
        var token = randomToken(8);
        db.temp(id, email, token, function(err, resulttwo){
            var output = `<p>Dear User,</p>
        <p>Dear Customer,

        We have receiver a request to reset your Password. 
        <p>Please click on the following link to reset your password.</p>
        Verification Link: <a href="http://localhost:3000/setpassword"> Reset Password</a>
        
        This is an automatically generated email. The link will expire in 10 minutes

        </p>`;

             var transoporter = nodemailer.createTransport({
                service: 'gmail',
                auth:{
                    user: 'ephraimloch@gmail.com',
                    pass: 'rvfgdjixhtmkybji'
                }
             });
             var mailOptions = {
                from: '8ight',
                to: email,
                subject: 'Password reset',
                html: output
             }
             transoporter.sendMail(mailOptions, function(err, info){
                if(err){
                    return console.log(err);
                }else{
                    console.log(info)
                }
             })

        })
    })
    res.sendFile("The password reset link has been sent to your email address")
})

module.exports= router;