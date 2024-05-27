var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var db= require.main.require('./models/db_controller');


router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());


router.get('/', function(req, res){
    res.render('verify.ejs')
})

router.post('/', function(req, res){
    var id = req.body.id;
    var token = req.body.token;
    console.log('Received token:', token); // Log the received token for debugging

    db.matchtoken(id, token, function(err, result){
        if(err) {
            console.error('Error matching token:', err);
            return res.status(500).send('Internal server error');
        }

        console.log('Database token:', result.length > 0 ? result[0].token : 'No match found'); // Log the database token for debugging

        if(result.length > 0){
            var email = result[0].email;
            var email_status = "Verified"; 
            db.updateverify(email, email_status, function(err, result){
                if(err) {
                    console.error('Error updating verification status:', err);
                    return res.status(500).send('Internal server error');
                }
                res.send('<p>Email verified. You can now <a href="/login">log in</a>.</p><script>setTimeout(function(){ window.location.href = "/login"; }, 3000);</script>');
            });
        } else {
            res.send('Token did not match');
        }
    });
});

module.exports = router;

// var express = require('express');
// var router = express.Router();
// var db = require.main.require('./models/db_controller');

// // GET route to handle instant verification
// router.get('/:email', function(req, res) {
//     var email = req.params.email; // Get the email from the URL parameter

//     // Call a function to update the user's verification status
//     db.updateverify(email, "Verified", function(err, result) {
//         if (err) {
//             console.error('Error updating verification status:', err);
//             return res.status(500).send('Internal server error');
//         }
//         // Redirect to the login page after successful verification
//         res.redirect('/login');
//     });
// });

// module.exports = router;
