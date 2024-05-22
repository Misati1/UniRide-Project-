var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var db= require.main.require('./models/db_controller');


router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

module.exports = router;
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
            var email_status = "Verified"; // Corrected typo
            db.updateverify(email, email_status, function(err, result){
                if(err) {
                    console.error('Error updating verification status:', err);
                    return res.status(500).send('Internal server error');
                }
                res.send("Email Verified");
            });
        } else {
            res.send('Token did not match');
        }
    });
});
