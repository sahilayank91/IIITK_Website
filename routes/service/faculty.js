var express = require('express');
var router = express.Router();
var newsOperations = require(__BASE__+"modules/database/accessors/news_operations");
var path = require('path');
var NewsController = require(__BASE__+"modules/controller/NewsController");
var FacultyController = require(__BASE__+"modules/controller/FacultyController");

var UserController = require(__BASE__+"modules/controller/UserController");
var RESPONSE = require(__BASE__ + "modules/controller/handler/ResponseHandler");


router.get('/getFacultyList',function(req,res,next){

    FacultyController.getFacultyList()
        .then(function (data) {
            if (data) {
                console.log("Datadsd:", data);
                RESPONSE.sendOkay(res, {success:true,data: data});
                return true;
            } else {
                console.log("Some error occured while getting data from the database");
            }
        });
});

router.post('/addFaculty',function(req,res,next){
    var promise;
    var parameters = {
        email: req.body.email,
        branch:req.body.branch,
        education:req.body.education,
        username: req.body.username,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        phone: req.body.phone,
        gender: req.body.gender,
        role: req.body.role,
        type:req.body.type,
        about:req.body.about,
    };
    FacultyController.registerFaculty(parameters)
        .then(function (data) {
            if (data) {
                console.log("Data:", data);
                RESPONSE.sendOkay(res, {success: true});
                // RESPONSE.sendOkay(res, parameters);
                return true;
            } else {
                console.log("Some error occured while getting data from the database");
            }
        });
    });


    router.post('/updateFaculty',function(req,res,next){
        var promise;
        promise  = NewsController.getNews();


        promise.then(function(data){
            // res.render('/index',{data:data});
        });
    });


    router.post('/deleteFaculty',function(req,res,next){
        var promise;
        var id = req.body.id;
        FacultyController.deleteFaculty(id)
            .then(function(data){
                RESPONSE.sendOkay(res,{success:true,redirect:path.join('/'+"faculty_dashboard")});
                return true;
            }).catch(function(error){
            console.log(error);
        });

        promise.then(function(data){
            // res.render('/index',{data:data});
        });
    });


















module.exports = router;