var express = require('express');
var router = express.Router();
var userOperations = require(__BASE__+"modules/database/accessors/user_operations");
var path = require('path');
var cookieParser = require('cookie-parser');
var RESPONSE = require(__BASE__ + "modules/controller/handler/ResponseHandler");
var DataValidator = require(__BASE__ + "modules/utils/DataValidator");
var client = require(__BASE__ + "modules/controller/handler/TokenHandler").REDIS_CLIENT;
var UserController = require(__BASE__ + "modules/controller/UserController");
var TokenHandler = require(__BASE__ + "modules/controller/handler/TokenHandler");

/* GET users listing. */
router.post('/login', function(req, res) {

    var userPass = req.body.userpass;
    var userEmail = req.body.useremail;
    if ((!DataValidator.isValidEmail(userEmail)) && !DataValidator.isValidPhone(phone) && !DataValidator.isValidUsername(username) && !DataValidator.isValidPassword(password)){

        console.log("User input is not correct");

    }else {
        var parameters = {
            userpass: userPass  ,
            useremail: userEmail
        };

        UserController.getUsers(parameters)
            .then(function (data) {
                if (data.length >0) {

                    /*Setting up session parameters*/
                    req.session.key = TokenHandler.generateAuthToken(data[0]._id,data[0].role);
                    req.session.email=data[0].email;
                    req.session.role = data[0].role;


                    RESPONSE.sendOkay(res, {success: true, redirect: path.join("/" + 'admin'), data:data});
                } else {
                    console.log("Some error occured while getting data from the database");
                }
            }).catch(function (err) {
            console.log(err);
        });
    }


});

router.post('/register',function(req,res) {
    var promise;
    var parameters = {
        email: req.body.email,
        password: req.body.password,
        username: req.body.username,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        phone: req.body.phone,
        gender: req.body.gender,
        role: req.body.role
    };
    UserController.registerUser(parameters)
        .then(function (data) {
            if (data) {
                console.log("Data:", data);
                RESPONSE.sendOkay(res, {success: true, redirect: path.join("/" + 'admin')});
                // RESPONSE.sendOkay(res, parameters);
                return true;
            } else {
                console.log("Some error occured while getting data from the database");
            }


        });
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
   };

   promise = userOperations.updateUser(parameters);
   promise.then(function(data){
       if(data){
           res.render('index', { title: 'Indian Institute of Information Technology, Kota' });
       }else{
           console.log("Some error occured while updating the users");
       }
   })



});
router.get('/getLoggedInUser',function(req,res){
    if (!req.session.key) {
        return;
    }
    var parameters = {
        useremail: req.session.email
    };
    UserController.getLoggedInUser(parameters)
        .then(function (data) {
            if (data.length > 0) {

                /*Setting up session parameters*/
                req.session.key = TokenHandler.generateAuthToken(data[0]._id, data[0].role);
                req.session.email = data[0].email;
                req.session.role = data[0].role;


                RESPONSE.sendOkay(res, {success: true, data: data});
            } else {
                console.log("Some error occured while getting data from the database");
            }
        }).catch(function (err) {
        console.log(err);
    });


});

router.get('/logout',function(req,res){



    req.session.destroy(function(err){
        if(err){
            console.log(err);
        } else {
            res.redirect('/');
        }
    });
});



module.exports = router;
