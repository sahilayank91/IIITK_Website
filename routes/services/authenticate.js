var express = require('express');
var router = express.Router();
var userOperations = require(__BASE__+"modules/database/accessors/user_operations");
var path = require('path');
var cookieParser = require('cookie-parser');
var RESPONSE = require(__BASE__ + "modules/controller/handler/ResponseHandler");
var DataValidator = require(__BASE__ + "modules/utils/DataValidator");
var client = require(__BASE__ + "modules/controller/handler/TokenHandler").client;


/* GET users listing. */
router.post('/login', function(req, res) {
    // Set our internal DB variable

    var promise;

    // Get our form values. These rely on the "name" attributes

    var userPass = req.body.userpass;
    var userEmail = req.body.useremail;


    if ((!DataValidator.isValidEmail(userEmail)) && !DataValidator.isValidPhone(phone) && !DataValidator.isValidUsername(username) && !DataValidator.isValidPassword(password)){



    }else{
        // Set our collection
        promise = userOperations.getUsers({email: userEmail, password: userPass}, {_id:1,firstname:1, lastname:1, email: 1,phone:1 ,profile_pic:1});
        promise.then(function(data){

            if(data){
                // client.set('framework', 'AngularJS', function(err, reply) {
                //     console.log(reply);
                // });
                //Redirecting to the admin portal
                res.render('partials/admin', { title: 'Admin Portal'});
                //TODO Set session variables after login

            }else{
                console.log("Some error occured while getting data from the database");
            }

        })

    }



});

router.post('/register',function(req,res){
    var promise = Promise.resolve(true);
    var parameters = {
        email: req.body.email,
        password: req.body.password,
        username: req.body.username,
        firstname : req.body.firstname,
        lastname : req.body.lastname,
        phone: req.body.phone,
        gender: req.body.gender,
        role: req.body.role
    };

    console.log("parmaeters",parameters);
    promise = userOperations.createUser(parameters);

    promise.then(function(data) {
        if (data) {
            res.render('index', { title: 'Indian Institute of Information Technology, Kota' });
        } else {
            console.log("Some error occured during registration, Please Try Again");
        }
    })
});

router.post('/updateUser',function(req,res){
   var promise = Promise.resolve(true);
   var parameters = {
       email: req.body.email,
       password: req.body.password,
       username: req.body.username,
       firstname : req.body.firstname,
       lastname : req.body.lastname,
       phone: req.body.phone,
       gender: req.body.gender,
       role: req.body.role
   }

   promise = userOperations.updateUser(parameters);
   promise.then(function(data){
       if(data){
           res.render('index', { title: 'Indian Institute of Information Technology, Kota' });
       }else{
           console.log("Some error occured while updating the users");
       }
   })



});


module.exports = router;
