var express = require('express');
var router = express.Router();
var userOperations = require(__BASE__+"modules/database/accessors/user_operations");
var path = require('path');

/* GET users listing. */
router.post('/login', function(req, res) {
    // Set our internal DB variable
    console.log("Inside login");
    var promise = Promise.resolve(true);
    // Get our form values. These rely on the "name" attributes
    var userPass = req.body.userpass;
    var userEmail = req.body.useremail;
    // Set our collection

    promise = userOperations.getUsers({email: userEmail, password: userPass}, {_id:1,firstname:1, lastname:1, email: 1,phone:1 ,profile_pic:1});
    promise.then(function(data){

        if(data){
            console.log("Data for the login:" , data);
             res.render('partials/admin', { title: 'Admin Portal'});

        }else{
            console.log("Some error occured while getting data from the database");
        }

    })
});

router.post('/register',function(req,res){
    var promise = Promise.resolve(true);
    console.log("request: ",req);
    var parameters = {
        userEmail: req.body.email,
        userPass: req.body.password,
        userName: req.body.username,
        firstname : req.body.firstname,
        lastname : req.body.lastname,
        userPhone: req.body.phone,
        gender: req.body.gender,
        role: req.body.role
    };

    console.log("Parameters:",parameters);

    promise = userOperations.createUser(parameters);

    promise.then(function(data) {
        if (data) {
            console.log("Data generated after creating the user: ", data);
            res.render('index', {userdata: data});
        } else {
            console.log("Some error occured during registration, Please Try Again");
        }
    })
});





module.exports = router;
