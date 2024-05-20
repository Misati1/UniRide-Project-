var mysql =require('mysql');
var express =require('express');
var router = express.Router();
var bodyParser = require('body-parser');


var con = mysql.createConnection({
    host:'localhost',
    user: 'root',
    password: '',
    database: 'hmsystem'
});

con.connect(function(err){
    if(err){
        throw err;
    }else{
        console.log('You are connected to the database')
    }
});

module.exports.signup = function(username, email, password, status, callback){
    con.query('SELECT email FROM users WHERE email = "'+email+'"',
    function(err, result){
        if(result[0]==undefined){
            var query= "INSERT INTO `users`(`username`,`email`,`password`,`email_status`) VALUES('"+username+"','"+email+"', '"+password+"','"+status+"')"
            console.log(query);
        }else{
            console.log("error")
        }
    })
}

module.exports.verify= function(username, email, token, callback){
    var query= "INSERT INTO `verify`(`username`, `email`, `token`) VALUES ('"+username+"', '"+email+"', '"+token+"')"
    con.query(query, callback)
}

module.exports.getuserid= function(email,callback){
    var query= "SELECT * FROM `verify` WHERE email = '"+email+"'"
    con.query(query, callback)
}

module.exports.matchtoken= function(id,token,callback){
    var query= "SELECT * FROM `verify` WHERE token = '"+token+"' and id= '"+id+"'"
    con.query(query, callback);
    console.log(query);
}

module.exports.updateverify= function(email, email_status, callback){
    var query= "UPDATE `users` set `email_status` = '"+email_status+"' where `email  = '"+email_status+"'"
    con.query(query, callback);
    console.log(query);
}

module.exports.findOne = function(email, callback){
    var query = "select * users where email = '"+email+"'"
    con.query(query, callback);
    console.log(query);
}


module.exports.temp = function(id, email,token, callback){
    var query = "insert into `temp`(`id`,`email`,`token`) values('"+id+"','"+email+"','"+token+"') "
    con.query(query, callback);
    console.log(query);
}

module.exports.add_driver = function(first_name,last_name, dob, gender, address, phone, image, department, biography, callback){
    var query = "insert into `doctor`(`first_name`,`last_name`,`email`, `gender`,`address`,`phone`,`image`,`department`,`biography`) values('"+first_name+"','"+last_name+"','"+email+"','"+dob+"','"+gender+"','"+address+"', '"+phone+"','"+image+"','"+department+"','"+biography+"') "
    con.query(query, callback);
    console.log(query);
}

module.exports.getAllDoc = function(callback){
    var query = "select * from doctor"
    con.query(query, callback);
    console.log(query);
}

module.exports.getDocbyId = function(id, callback){
    var query = "select * doctor where id = '"+id+"'"
    con.query(query, callback);
    console.log(query);
}

module.exports.edit_driver = function(first_name,last_name, dob, gender, address, phone, image, department, biography, callback){
    var query = "update `doctor` set `first_name` = '"+first_name+"',`last_name` = '"+last_name+"',`email` = '"+email+"', `gender` = '"+gender+"',`address` = '"+address+"',`phone` = '"+phone+"',`image` = '"+image+"',`department` = '"+department+"',`biography` = '"+biography+"' where id = '"+id+"'"
    con.query(query, callback);
    console.log(query);
}

module.exports.deleteDoc = function(id, callback){
    var query = "delete from doctor where id = '"+id+"'"
    con.query(query, callback);
    console.log(query);
}

module.exports.searchDoc = function(id, callback){
    var query = "select from doctor where first_name like "%"'+key+''%' "
    con.query(query, callback);
    console.log(query);
}

module.exports.getalldept = function(id, callback){
    var query = "select * from departments"
    con.query(query, callback);
    console.log(query);
}

module.exports.getleavebyid = function(id, callback){
    var query = "select * from leaves where id="+id;
    con.query(query, callback)
}

module.exports.getAllleave = function(callback){
    var query = "select * from leaves"
    con.query(query, callback)
}

module.exports.add_leave= function(name, id, type, from, to, reason, callback){
    var query= "Insert into `leaves` (`employee`,`emp_id`, `leave_type`,`date_from`,`date_to`,`reason`) values('"+name+"', '"+id+"', '"+type+"', '"+from+"', '"+to+"','"+reason+"')"
    console.log(query)
    con.query(query, callback);
}

module.exports.deleteleave = function(id, callback){
    var query = "delete from leaves where id="+id;
    con.query(query, callback)
}

module.exports.getAllemployee = function(callback){
    var query = "select * from employee"
    con.query(query, callback)
}

module.exports.add_employee= function(name,email ,email, contact, join_date, role, salary, callback){
    var query= "Insert into `employee` (`name`,`email`, `contact`,`join_date`,`role`,`salary`) values('"+name+"', '"+email+"', '"+contact+"', '"+join_date+"', '"+role+"','"+salary+"')"
    console.log(query)
    con.query(query, callback);
}

module.exports.searchEmp = function(key, callback){
    var query = "select * from employee where name like "%"'+key+''%' "
    con.query(query, callback);
    console.log(query);
}

module.exports.deleteEmp=function(id, callback){
    var query = "delete from employee where id="+id;
    con.query(query, callback)
}

module.exports.editEmp=function(id, name, email, contact, join_date, role, callback){
    var query = "update `employee` set `name` = '"+name+"', `email`= '"+email+"',`contact`= '"+contact+"',`join_date`= '"+join_date+"',`role`= '"+role+"' where id ="+id;
    con.query(query, callback);
}

module.exports.getEmployeebyId=function(id, callback){
    var query = "select * from employee where id="+id;
    con.query(query, callback)
}

module.exports.edit_leave=function(id, name, leave_type, from, to, reason, callback){
    var query = "update `leaves` set `employee` = '"+name+"', `leave_type`= '"+leave_type+"',`date_from`= '"+from+"',`date_to`= '"+to+"',`reason`= '"+reason+"' where id ="+id;
    con.query(query, callback);
}

module.exports.add_ride = function(p_name, department, d_name, date, time, email, phone, callback){
    var query= "insert into ride (passenger_name, department, driver_name, date, time, email, phone) values ('"+p_name+"', '"+department+"', '"+d_name+"', '"+date+"', '"+time+"', '"+email+"', '"+phone+"')";
    con.query(query, callback);
}

module.exports.getallride= function(callback){
    var query = "select * from ride";
    con.query(query, callback);
}

module.exports.edit_ride=function(id, p_name, department, d_name, date, time, email, phone, callback){
    var query = "update `ride` set `passenger_name` = '"+p_name+"', `department`= '"+department+"',`driver_name`= '"+d_name+"',`date`= '"+date+"',`email`= '"+email+"', `phone`= '"+phone+"' where id ="+id;
    con.query(query, callback);
}

module.exports.deleteride= function(id, callback){
    var query = "delete from ride where id="+id;
    con.query(query, callback);
}

module.exports.postcomplain=function(message, name, email, subject, callback){
    var query = "insert into complain(message, name, email, subject) values('"+message+"', '"+name+"', '"+email+"', '"+subject+"')"
    con.query(query, callback);
}

module.exports.getcomplain= function(callback){
    var query = "select * from complain";
    con.query(query, callback);
}