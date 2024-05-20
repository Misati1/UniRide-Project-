var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var db = require.main.require('./models/db_controller');

router.get('*', function(res, req, next){
    if(req.cookies['username'==null]){
        res.redirect('/login');
    }else{
        next();
    }
})

router.get('/', function(req, res){
    db.getAllEmployee(function(err, result){
        res.render('salary.ejs', {employee:result})
    })
})

router.get('/generateslip/:id', function(req, res){
    var id = req.params.id;
    db.getEmployeebyId(id , function(err, result){
        var name = result[o].name;
        var id= result[o].id;
        var email = result[o].email;
        var role = result[o].role;
        var salary = result[o].salary;
        var join_date = result[o].join_date;
        var contact = result[o].contact;
        res.render('payslip.ejs', {name:name, id:id, email:email, role:role, salary:salary, join_date:join_date,contact:contact })
    })
})

module.exports=router;