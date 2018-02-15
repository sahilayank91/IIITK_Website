var express = require('express');
var router = express.Router();
var userOperations = require(__BASE__+"modules/database/accessors/user_operations");
var path = require('path');
var cookieParser = require('cookie-parser');
var RESPONSE = require(__BASE__ + "modules/controller/handler/ResponseHandler");
var DataValidator = require(__BASE__ + "modules/utils/DataValidator");
var client = require(__BASE__ + "modules/controller/handler/TokenHandler").REDIS_CLIENT;
var UserController = require(__BASE__ + "modules/controller/UserController");


/* GET users listing. */
router.post('/login', function(req, res) {
    // Set our internal DB variable

    var promise;

    // Get our form values. These rely on the "name" attributes

    var userPass = req.body.userpass;
    var userEmail = req.body.useremail;
    console.log(userPass);

    if ((!DataValidator.isValidEmail(userEmail)) && !DataValidator.isValidPhone(phone) && !DataValidator.isValidUsername(username) && !DataValidator.isValidPassword(password)){

        console.log("User input is not correct");

    }else {
        var parameters = {
            userpass: userPass,
            useremail: userEmail
        };

        UserController.getUsers(parameters)
            .then(function (data) {
                if (data) {
                    console.log("Data:" ,data);
                    RESPONSE.sendOkay(res, {success: true, redirect: path.join("/" + 'admin')});
                    // RESPONSE.sendOkay(res, parameters);
                    return true;
                } else {
                    console.log("Some error occured while getting data from the database");

                }


            }).catch(function (err) {
            console.log(err);
        });
    }


});

router.post('/register',function(req,res){
    var promise;
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

    // if ((!DataValidator.isValidEmail(parameters.email) && !DataValidator.isValidPhone(parameters.phone))
    //     || !DataValidator.isValidName(parameters.firstname, parameters.lastname, role) || !DataValidator.isValidTextWithNumbers(password)
    // ){
    //
    // }else{
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
