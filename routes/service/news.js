var express = require('express');
var router = express.Router();
var newsOperations = require(__BASE__+"modules/database/accessors/news_operations");
var RESPONSE = require(__BASE__ + "modules/controller/handler/ResponseHandler");
var path = require('path');
var NewsController = require(__BASE__+"modules/controller/NewsController");


router.post('/getNews',function(req,res,next){


    newsOperations.getNews()
        .then(function(data){
            if(data){
                RESPONSE.sendOkay(res, {success: true, data: data});
            }
        }).catch(function (error) {
        console.log("Error : ", error);
    });
});


router.post('/addNews',function(req,res,next){
    var parameters = {
        type: req.body.type,
        posted_by: req.body.posted_by,
        content:req.body.content
    };

    console.log(parameters);

    NewsController.addNewsDetails(parameters)
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

router.post('/updateNews',function(req,res,next){
    var promise;
    promise  = NewsController.getNews();


    promise.then(function(data){
        // res.render('/index',{data:data});
    });
});


router.post('/deleteNews',function(req,res,next){
    var parameters = {
        _id:req.body._id,
        type:req.body.type
    };

    NewsController.deleteNews(parameters)
        .then(function () {
            RESPONSE.sendOkay(res, {success: true});
            return true;

        });
});



module.exports = router;