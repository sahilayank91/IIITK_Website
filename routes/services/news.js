var express = require('express');
var router = express.Router();
var newsOperations = require(__BASE__+"modules/database/accessors/news_operations");
var path = require('path');
var NewsController = require(__BASE__+"modules/controller/NewsController");


router.get('/getNews',function(req,res,next){
    var promise;
    promise  = NewsController.getNews();


    promise.then(function(data){
        res.render('/index',{data:data});
    });
});

















module.exports = router;