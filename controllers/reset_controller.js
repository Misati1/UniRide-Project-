var express = require('express');
var flash = require('flash');
var router = express.Router();
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
var randomToken = require('random-token');
var db = require.main.require('./models/db_controller');


//router.get('/', function(req, res){
//    resizeBy.render('resetpassword.ejs');
//})

router.post('/', function(req, res){
    var email = request.boody.email;
    db.findOne(email, function(err, resultone){
        if(!resultone){
            console.log("Email does not exist");
            response.send("Mail does not exist");
        }
        var id = resultone[0].id;
        var email = resultone[0].email;
        var token = randomToken(8);
        db.temp(id, email, token, function(err, resulttwo){
            var output = `<p>Dear User,</p>
            <p>We have received your request to reset your password.<br>
             To proceed with setting a new password, please use the following token:</p>
             <ul>
             <li>User Id: `+id+`</li>
             <li>User Token: `+token+`</li>
             </ul>`

             var transoporter = nodemailer.createTransport({
                service: 'gmail',
                auth:{
                    user: 'ephraimloch@gmail.com',
                    pass: '88Carterraid&'
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
    res.sendFile("A token has been sent to your email address")
})

module.exports= router;