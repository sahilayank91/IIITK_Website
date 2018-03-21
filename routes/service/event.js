var express = require('express');
var router = express.Router();
var newsOperations = require(__BASE__+"modules/database/accessors/news_operations");
var path = require('path');
var EventController = require(__BASE__+"modules/controller/EventController");
var RESPONSE = require(__BASE__ + "modules/controller/handler/ResponseHandler");

router.get('/getEvent',function(req,res,next){
    var promise;
    promise  = EventController.getEvent();

    promise.then(function(data){
        console.log("Data in get Event: ",data);
        RESPONSE.sendOkay(res, {success:true,data: data});
    }).catch(function(error){
        console.log("Error in get Event: ",error);
    });


});

router.post('/addEvent',function(req,res,next){
    var parameters= {};
    parameters.title = req.body.title;
    parameters.description = req.body.description;
    parameters.date = req.body.date;
    parameters.type= req.body.type;
    parameters.organizer = req.body.organizer;
    var promise;
    promise  = EventController.addEvent(parameters);
    promise.then(function(data){
       console.log("Data in add Event: ",data);
        RESPONSE.sendOkay(res, {success:true,data: data});
    }).catch(function(error){
        console.log("Error in add Event: ",error);
    });

});
router.post('/updateEvent',function(req,res,next){
    var promise;
    promise  = NewsController.getNews();


    promise.then(function(data){
        // res.render('/index',{data:data});
    });
});


router.post('/deleteEvent',function(req,res,next){
    var promise;
    promise  = NewsController.getNews();


    promise.then(function(data){
        // res.render('/index',{data:data});
    });
});
















module.exports = router;