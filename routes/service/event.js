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
    var parameters= {};
    parameters.title = req.body.title;
    parameters.description = req.body.description;
    parameters.date = req.body.date;
    parameters.type= req.body.type;
    parameters.organizer = req.body.organizer;
    parameters._id = req.body._id;

    EventController.updateEvent(parameters)
        .then(function(data){
            console.log("Data: ",data);
            RESPONSE.sendOkay(res,{success:true,data:data});
        }).catch(function(Error){
            console.log(Error);
    });
});


router.post('/deleteEvent',function(req,res,next){
    var promise;
    var id = req.body._id;
    promise  = EventController.deleteEvent(id);
    promise.then(function(data){
        console.log("Deleted Event: ",data);
        RESPONSE.sendOkay(res,{success:true,data:data});

    }).catch(function(error){
        console.log(error);
    })
});
















module.exports = router;