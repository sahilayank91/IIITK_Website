var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
var Promise = require('bluebird');
var batchOperations = require(__BASE__+"modules/database/accessors/batch_operations");


router.get('/getStudentList',function(req,res,next){
   console.log("Inside get Student List");

   var year = req.body.year;
   var type = req.body.type;
   var branch = req.body.branch;

   var query = {
       year: year,
       type: type,
       branch: branch
   }

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















module.exports = router;
