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
    db.getallride(function(err, result){
        console.log(result);
        res.render('ride.ejs', {list:result})
    })
});

router.get('/add_ride', function(req, res){
    res.render('add_ride.ejs');
})

router.post('/add_ride', function(req, res){
    db.add_ride(req.body.p_name, req.body.department, req.body.d_name, req.body.date, req.body.time, req.body.email, req.body.phone, 
        function(err, result){
        res.redirect('/ride')
    });
})

    router.get('/edit_ride/:id', function(req, res){
        var id = req.paramss.id;
        db.getallridebyid(id, function(err, result){
            console.log(result);
            res.render('edit_ride.ejs', {list:result});
        })
    })
router.post('/add_ride', function(req, res){
    db.add_ride(req.body.p_name, req.body.department, req.body.d_name, req.body.date, req.body.time, req.body.email, req.body.phone, 
        function(err, result){
        res.redirect('/ride')
    });
})

router.post('/edit_ride/:id', function(req, res){
    db.edit_ride(req.body.p_name, req.body.department, req.body.d_name, req.body.date, req.body.time, req.body.email, req.body.phone, 
        function(err, result){
        res.redirect('/ride')
    });
})

router.get('/delete_ride/:id', function(req, res){
    var id = req.params.id;
    db.getallridebyid(id, function(err, result){
        console.log(result);
        res.render('delete_ride.ejs', {list:result})
    })
});

router.post('/delete_ride/:id', function(req, res){
    var id = req.params.id;
    db.deleteride(id, function(err, result){
        res.redirect('/ride')
    })
});

module.exports=router;