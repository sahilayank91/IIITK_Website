var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
var Promise = require('bluebird');
var path = require('path');
var RESPONSE = require(__BASE__ + "modules/controller/handler/ResponseHandler");
var batchOperations = require(__BASE__+"modules/database/accessors/batch_operations");
var client = require(__BASE__ + "modules/controller/handler/TokenHandler").REDIS_CLIENT;
var BatchController = require(__BASE__ + "modules/controller/BatchController");


router.get('/getStudentList',function(req,res,next){
   console.log("Inside get Student List");

   var year = req.body.year;
   var type = req.body.type;
   var branch = req.body.branch;

   var query = {
       year: year,
       type: type,
       branch: branch
   };

   batchOperations.getStudentList(query)
       .then(function(data){
          if(data.length > 0){
              console.log("The student list by database: ",data);
              //TODO set the name of the template you want to load
              //Todo Also there is a need to change the /btech calls from index.js


              res.render("partials/", {data: data});
          }
       });
});

router.post('/addBatch',function(req,res) {
    var promise;


    var parameters = {
        year: req.body.year,
        type: req.body.type,
        branch: req.body.branch,
        students:req.body.students
    };

    console.log(parameters);

    BatchController.addBatch(parameters)
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




module.exports = router;
