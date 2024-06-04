var express = require('express');

var router = express.Router();
var bodyParser = require('body-parser');
var db = require.main.require ('./models/db_controller');
const setPasswordController = require('../controllers/setpassword');

router.use(bodyParser.urlencoded({extended : true}));
router.use(bodyParser.json());

const bcrypt = require('bcrypt');


router.get('/',function(req,res){

    res.render('setpassword.ejs');
});

router.post('/', (req, res) => {
    setPasswordController.setPassword(req, res);
  });

exports.setPassword = (req, res) => {
  const { password, confirmPassword } = req.body;

  // Check if the passwords match
  if (password !== confirmPassword) {
    return res.status(400).send('Passwords do not match');
  }
  router.post('/', function(req, res){
        db.query('UPDATE users SET password = ? WHERE email = ?', [password, req.session.email], (err, result) => {
          if (err) {
            return res.status(500).send('Error updating password');
          }
      
          res.send('Password changed successfully');
          req.session.destroy();
          res.redirect('/login');
        });
      });
    }

module.exports =router;


